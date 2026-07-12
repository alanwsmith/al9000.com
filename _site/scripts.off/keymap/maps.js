export const filterByPrefix = (map, prefix) => {
  return [...map.entries().filter(([keys, _]) => keys.startsWith(prefix))];
};

const toEntries = (
  m,
) => (m instanceof Map ? [...m.entries()] : Object.entries(m));

export const mergeDistinctPrefix = (base, overlay) => {
  const overlayEntries = toEntries(overlay);
  const baseEntries = toEntries(base);
  const distinctEntries = baseEntries
    .filter(
      ([bk, _]) =>
        !overlayEntries.some(
          ([ok, _]) => ok.startsWith(bk) || bk.startsWith(ok),
        ),
    )
    .concat(overlayEntries);

  return new Map(distinctEntries);
};