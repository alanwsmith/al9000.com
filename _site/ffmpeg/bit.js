export const b = { init: "update" };

export function update(_, __, el) {
  const args = {};
  const els = b.qsa(`[data-s="update"]`).forEach((item) => {
    args[item.id] = item.value.trim();
  });
  const command = [`ffmpeg -y -loglevel error -hide_banner`];
  command.push(`-i ${args.input}`);
  if (args.start) {
    command.push(`-ss ${args.start}`);
  }
  if (args.length) {
    command.push(`-t ${args.length}`);
  }
  if (args.scale) {
    command.push(`-vf`);
  }
  if (args.scale) {
    command.push(`"scale=${args.scale}"`);
  }
  command.push(args.output);
  el.value = command.join(" ");
}

export function copy(_, sender, el) {
  b.quickCopy(el, sender);
}