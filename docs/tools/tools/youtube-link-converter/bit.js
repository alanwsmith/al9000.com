export const b = {};

export function convertYouTubeLinks(_, sender, el) {
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
