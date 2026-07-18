export const b = {
  init: "overlay",
};

export function overlay(_, __, el) {
  el.replaceChildren(b.render("svg", subs()));
}

function subs() {
  const window1 = new WindowMaker(0, 0);
  const window2 = new WindowMaker(0, 1);
  const window3 = new WindowMaker(1, 3);
  return {
    __PAGE_WIDTH__: 3840,
    __PAGE_HEIGHT__: 2160,
    __WINDOWS__: [
      window1.getWindow(),
      window2.getWindow(),
      window3.getWindow(),
    ],
  };
}

class WindowMaker {
  #borderRadius = 12;
  #padding = 52;
  #pageWidth = 3840;
  #pageHeight = 2160;
  #colCoords = [
    [0, 600],
    [600, this.#pageWidth - this.#padding],
  ];
  #rowCoords = [
    [50, 800],
    [800, 800 + 740],
    [680, 961],
    [50, 1761 + 50 + this.padding()],
  ];

  constructor(colIndex, rowIndex) {
    this.colIndex = colIndex;
    this.rowIndex = rowIndex;
  }

  borderRadius() {
    return this.#borderRadius;
  }

  padding() {
    return this.#padding;
  }

  pageHeight() {
    return this.#pageHeight;
  }

  pageWidth() {
    return this.#pageWidth;
  }

  x() {
    const value = this.#colCoords[this.colIndex][0] + this.padding();
    return value;
  }

  y() {
    const value = this.#rowCoords[this.rowIndex][0] + this.padding();
    return value;
  }

  width() {
    const value = this.#colCoords[this.colIndex][1] -
      this.#colCoords[this.colIndex][0] - this.padding();
    return value;
  }

  height() {
    const value = this.#rowCoords[this.rowIndex][1] -
      this.#rowCoords[this.rowIndex][0] - this.padding();
    return value;
  }

  getWindow() {
    return `<rect
x="${this.x()}" 
y="${this.y()}" 
width="${this.width()}" 
height="${this.height()}" 
rx="${this.borderRadius()}" 
/>`;
  }
}