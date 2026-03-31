export const b = { init: "playerEls" };

let ytApiPromise;
let players = [[], []];

export async function playerEls(_, __, el) {
  for (let i = 0; i < 4; i += 1) {
    // const player = await addPlayer(el);
    // players.push(player);
    // seekAndPlay(i);
  }
}

async function seekAndPlay(index) {
  const times = b.data.timers.times;
  const timer = times[b.randomInt(0, times.length - 1)];
  players[index].seekTo(timer[0]);
  await b.sleep(timer[1] * 1000);
  seekAndPlay(index);
}

async function addPlayer(el) {
  fetchApi();
  await ytApiPromise;
  const playerEl = b.ce("div");
  el.append(playerEl);
  return new Promise((resolve) => {
    let player = new YT.Player(playerEl, {
      width: "100%",
      videoId: "kILYJ0qFhHM",
      playerVars: { "playsinline": 1 },
      events: {
        "onReady": (event) => {
          event.target.mute();
          resolve(player);
        },
      },
    });
  });
}

function fetchApi() {
  if (window.YT || (window.YT && window.YT.Player)) return;
  ytApiPromise = new Promise((res, rej) => {
    var el = document.createElement("script");
    el.src = "https://www.youtube.com/iframe_api";
    el.async = true;
    el.onload = (_) => {
      YT.ready(res);
    };
    el.onerror = rej;
    document.body.append(el);
  });
}
