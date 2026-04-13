export const b = {};

export function clearUniqueWords(_, __, el) {
  el.value = "";
  b.forwardSender(el, "updateUniqueWords");
}

export function copyUniqueWords(_, sender, el) {
  b.quickCopy(el, sender);
}

export function showUniqueWordsExample(_, __, el) {
  el.value = `
echo, alfa bravo
charlie Bravo alfa 
delta echo
alfa 
`.trim();
  b.forwardSender(el, "updateUniqueWords");
}

export function updateUniqueWords(_, sender, el) {
  const words = new Set();
  const lines = sender.value.split("\n");
  lines.forEach((line) => {
    line.split(" ").forEach((word) => {
      if (word !== "") {
        words.add(
          word
            .replaceAll(",", "")
            .replaceAll(".", "")
            .replaceAll("_", "")
            .replaceAll("-", "")
            .trim(),
        );
      }
    });
  });
  el.value = [...words].sort(b.sort).join("\n");

  // let input = this.getValue(".in").replace(/\W/g, " ").toLowerCase();
  //  const lines = sender.value.split("\n");

  // const words = new Set();
  // lines.forEach((line) => {
  //   line.split(" ").forEach((w) => {
  //     if (w !== "") {
  //       words.add(w);
  //     }
  //   });
  // });
}
