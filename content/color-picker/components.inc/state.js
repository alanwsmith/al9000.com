class State {
  constructor(b) {
    this.b = b;
    this.data = {};
  }
  setActiveValue(key, value) {
    for (let mode of this.data.modes) {
      if (this.data.activeMode === mode.__KEY__) {
        mode.background[key] = value;
      }
    }
  }
  async save() {
    b.info("Saving data");
    await b.savePageData("data", this.data);
  }
}
