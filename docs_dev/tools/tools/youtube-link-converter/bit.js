export const b = {};

export function clearYouTubeLinksToNeopolitan(_, __, el) {
  el.value = "";
  b.forwardSender(el, "updateYouTubeLinksToNeopolitan");
}

export function copyYouTubeLinksToNeopolitan(_, sender, el) {
  b.quickCopy(el, sender);
}

export function showYouTubeLinksToNeopolitanExample(_, __, el) {
  el.value = `
https://www.youtube.com/watch?v=DvJRdS1CaYQ
https://www.youtube.com/watch?v=-91vymvIH0c
https://www.youtube.com/watch?v=fiShsfvbFUA

`.trim();
  b.forwardSender(el, "updateYouTubeLinksToNeopolitan");
}

export function updateYouTubeLinksToNeopolitan(_, sender, el) {
  const lines = sender.value
    .split("\n")
    .map((line) => {
      try {
        const params = new URLSearchParams(new URL(line).searchParams);
        return params.get("v").trim();
      } catch (_) {
        return "";
      }
    }).filter((line) => line !== "")
    .map((id) => `-- youtube\n-- ${id}`);
  el.value = lines.join("\n\n");
}