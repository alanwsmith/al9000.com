import { mergeDistinctPrefix } from "./maps.js";

export class StackMap extends Map {
  #stack = [];
  #shadowByPrefix;

  constructor(opts) {
    super();
    this.#shadowByPrefix = opts?.shadowByPrefix ?? false;
  }

  #replace(next) {
    this.clear();
    for (const [key, value] of next) this.set(key, value);
  }

  push(map, opts) {
    this.#stack.push(new Map(this));
    this.#replace(
      this.#shadowByPrefix && !opts?.exclusive
        ? mergeDistinctPrefix(this, map)
        : new Map(Object.entries(map)),
    );
    return this;
  }

  pop() {
    const previous = this.#stack.pop();
    if (previous) this.#replace(previous);
    return this;
  }

  reset() {
    const base = this.#stack[0] ?? new Map();
    this.#stack = [];
    this.#replace(base);
  }
}
