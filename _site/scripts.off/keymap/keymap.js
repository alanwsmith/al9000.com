import { raise } from "./errors.js";
import { canonicalize, isModifier } from "./keys.js";
import { filterByPrefix } from "./maps.js";
import { StackMap } from "./stackmap.js";

const ORIGINAL = Symbol();

export class Keymap {
  #map = new StackMap({
    shadowByPrefix: true,
  });
  #buffer = [];

  constructor(initial) {
    if (initial) this.set(initial);
  }

  set(keyOrMap, a2) {
    if (typeof keyOrMap === "object") {
      Object.entries(keyOrMap).forEach(([keys, binding]) => {
        return this.set(keys, binding);
      });
      return this;
    }

    if (!a2) {
      raise(`No binding given for ${keyOrMap}`);
    }

    if (
      typeof keyOrMap !== "string" ||
      !["function", "object"].includes(typeof a2)
    ) {
      raise(`Invalid keymap entry: ${keyOrMap} => ${typeof a2}`);
    }

    this.#map.set(canonicalize(keyOrMap), this.#normalizeBinding(a2));
    return this;
  }

  type(event, ctx) {
    // normalize: strings and KeyboardEvents both reduce to one canonical key
    const keyInput = canonicalize(event);

    // prevent lone modifiers to mess up the buffer
    if (isModifier(keyInput)) return;

    this.#buffer.push(keyInput);

    const current = this.#buffer.join(" ");
    const matches = filterByPrefix(this.#map, current);

    if (matches.length === 0) {
      this.#buffer = [];
      return "unhandled";
    }

    if (matches.length > 1) {
      return "pending";
    }

    const [keys, binding] = matches[0];
    if (current.length < keys.length) {
      return "pending";
    }

    // --- we have a match! ---

    const { effect } = binding;
    this.#buffer = []; // clear buffer early, so effects may call .type()

    let preventDefault = binding.preventDefault ?? true;
    const permitDefault = () => (preventDefault = false);
    effect({ permitDefault, context: ctx });

    if (
      preventDefault &&
      typeof event !== "string" &&
      "preventDefault" in event
    ) {
      event.preventDefault();
    }

    return "handled";
  }

  // using an arrow function so it can be used as an event handler without needing to bind it
  handleKeyboardEvent = (e) => {
    this.type(e, this.context);
  };

  reset = () => {
    this.#buffer = [];
  };

  #normalizeBinding(binding) {
    if (typeof binding === "function") {
      return {
        effect: binding,
        // carry it around so .set and .get work as expected from
        // a user's POV, but internally we always have an object
        [ORIGINAL]: binding,
      };
    }
    // @ts-ignore
    binding[ORIGINAL] = binding;
    return binding;
  }

  #unwrapBinding(binding) {
    // @ts-ignore
    return binding[ORIGINAL];
  }

  get(key) {
    const binding = this.#map.get(canonicalize(key));
    return binding ? this.#unwrapBinding(binding) : undefined;
  }

  load(bindings) {
    this.#fullReset();
    this.set(bindings);
    return this;
  }

  push(map, opts) {
    const normalized = Object.fromEntries(
      Object.entries(map).map(([k, b]) => [
        canonicalize(k),
        this.#normalizeBinding(b),
      ]),
    );
    this.#map.push(normalized, opts);
    return this;
  }

  pop() {
    this.#map.pop();
    return this;
  }

  #fullReset() {
    this.#map.reset();
    this.#buffer = [];
  }

  current() {
    return this.#map;
  }

  list() {
    return [...this.#map.entries()].map(([keys, binding]) => {
      return {
        ...binding,
        keys,
      };
    });
  }
}