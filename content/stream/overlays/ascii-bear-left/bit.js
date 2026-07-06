export const b = {
  init: "overlay",
};

const config = {
  __PAGE_WIDTH__: 3840,
};

export function overlay(_, __, el) {
  el.replaceChildren(b.render("svg"));
}

window.BittyClass = class {
  #borderRadius = 12;
  #padding = 52;
  #pageWidth = 3840;
  #pageHeight = 2160;
  #colCoords = [
    [/* skip for 1 index */],
    [0, 600],
    [600, this.#pageWidth - this.#padding],
  ];
  #rowCoords = [
    [/* skip for 1 index */],
    [50, 800],
    [800, 800 + 740],
    [680, 961],
    // [30, this.#pageHeight - this.#padding - 50],

    [50, 1761 + 50 + this.padding()],
  ];
  #windows = [
    {
      name: "bearcam",
      colIndex: 1,
      rowIndex: 1,
    },
    {
      name: "chat",
      colIndex: 1,
      rowIndex: 2,
    },
    {
      name: "main_screen",
      colIndex: 2,
      rowIndex: 4,
    },
    // target width / input widht + input heigh
  ];

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

  /*
  constructor() {
    this.padding = 26;
    this.pageWidth = 3840;
    this.pageHeight = 2160;
    this.rowsCoords = [
      [20, this.pageHeight - this.padding - 50],
      [20, 400],
      [400, 680],
      [680, 961],
    ];
    this.columnCoords = [
      [0, 700],
      [700, this.pageWidth - this.padding],
    ];
    this.windows = [
      {
        name: "bearcam",
        rowCoords: 1,
        columnCoords: 1
      }
      ["bearcam", 0, 1],
      ["monitor", 1, 0],
      ["keyboard-left", 1, 2],
      ["keyboard-right", 1, 3]
    ]
  }
  */

  getCoords(column, rowIndex) {
    return ``;
    /*
x="${this.columns[columnIndex][0] + this.padding}"
y="${this.rows[rowIndex][0] + this.padding}"
width="${this.columns[columnIndex][1] - this.columns[columnIndex][0] - this.padding}"
height="${this.rows[rowIndex][1] - this.rows[rowIndex][0] - this.padding }"
rx="12"`;
    */
  }

  /*

// x="${this.columns[columnIndex][0] + this.padding}"
y="${this.rows[rowIndex][0] + this.padding}"
width="${this.columns[columnIndex][1] - this.columns[columnIndex][0] - this.padding}"
height="${this.rows[rowIndex][1] - this.rows[rowIndex][0] - this.padding }"

  */

  x(win) {
    const value = this.#colCoords[win.colIndex][0] + this.padding();
    return value;
  }

  y(win) {
    const value = this.#rowCoords[win.rowIndex][0] + this.padding();
    return value;
  }

  width(win) {
    const value = this.#colCoords[win.colIndex][1] -
      this.#colCoords[win.colIndex][0] - this.padding();
    console.log(value);
    return value;
  }

  height(win) {
    const value = this.#rowCoords[win.rowIndex][1] -
      this.#rowCoords[win.rowIndex][0] - this.padding();
    return value;
  }

  getWindow(win) {
    console.log(win);
    return `
<rect
x="${this.x(win)}" 
y="${this.y(win)}" 
width="${this.width(win)}" 
height="${this.height(win)}" 
rx="${this.borderRadius()}"
/>
`;

    /*
    const rowIndex = win[1];
    const columnIndex = win[2];
    return `
<!-- ${win[0]} -->
<rect ${this.getCoords(rowIndex, columnIndex)} />`

      */

    return ``;
  }

  getWindows() {
    return this.#windows.map((win) => {
      return this.getWindow(win);
    });
  }

  update(_event, el) {
    el.innerHTML = `
      <div class="layer">
        <svg width="${this.pageWidth()}" height="${this.pageHeight()}" xmlns="http://www.w3.org/2000/svg">
          <mask id="mainMask">
            <rect x="0" y="0" width="${this.pageWidth()}" height="${this.pageHeight()}" fill="white" />
            ${this.getWindows()}
          </mask>
          <image x="0" y="0" width="${this.pageWidth()}" height="${this.pageHeight()}" href="/asciibear/overlay/wood-background-1.jpg" mask="url(#mainMask)" />
        </svg>
      </div>`;

    /*
          <!-- main mask -->
          <mask id="mainMask">
            <!-- base size -->
            <rect x="0" y="0" width="${this.pageWidth}" height="${this.pageHeight}" fill="white" />
            ${this.getWindows()}
            <!--
            <rect x="${this.columns[0]}" y="${this.rows[0]}" width="1569" height="886" rx="12" fill="black" />
            <rect x="1590" y="${this.rows[0]}" width="320" height="420" rx="12" fill="black" />
            <rect x="1620" y="500" width="280" height="100" rx="12" fill="black" />
            <rect x="1590" y="440" width="320" height="456" rx="12" fill="black" />
            -->
          </mask>
          <image x="0" y="0" width="3840" height="2160" href="/backgrounds/asciibear/background.jpg" mask="url(#mainMask)" />
    */
  }
};
