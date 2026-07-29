class State {
  constructor(b) {
    this.b = b;
    this.data = {};
  }
  hueCount() {
    return 360 / this.data.hueRotation;
  }
  async save() {
    b.trace("Saving data");
    await b.savePageData("data", this.data);
  }
}
