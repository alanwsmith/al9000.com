class State {
  constructor() {
    this.data = {};
  }
  getActiveMode() {
    for (let mode of this.data.modes) {
      if (this.data.activeMode === mode.__KEY__) {
        return mode;
      }
    }
  }
  setActiveValue(key, value) {
    for (let mode of this.data.modes) {
      if (this.data.activeMode === mode.__KEY__) {
        mode.background[key] = value;
      }
    }
  }
}