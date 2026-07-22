'use strict';

// src/bundle-helpers.ts
function lazy(id, aliases, load) {
  return Object.assign(() => load().then((m) => m.default), { id, aliases });
}
function mapBundle(bundle, map) {
  return Object.fromEntries(
    Object.entries(bundle).map(([key, handle]) => [
      key,
      Object.assign(() => handle().then(map), { id: handle.id, aliases: handle.aliases })
    ])
  );
}

exports.lazy = lazy;
exports.mapBundle = mapBundle;
