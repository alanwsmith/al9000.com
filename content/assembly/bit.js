export const b = { init: "init" };

export async function init() {
  [...b.qsa("video")].forEach((el) => {
    el.addEventListener("ended", (event) => {
      // event.target.src = "[@parent(file_path)@]/clips/assembly-_V1-0005.mp4";
      // event.target.play();
      console.log(event);
    });
  });
  // b.qs("#v1").play();
}
