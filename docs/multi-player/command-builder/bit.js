export const b = { init: "init" };

const state = {};
let formData;
const cmd = [
  "ffmpeg",
  "-y",
  "-f",
  "lavfi",
];

export function init() {
  b.qs("#submitButton").click();
}

export function command(ev, sender, el) {
  if (ev.type === "submit") {
    ev.preventDefault();
    formData = new FormData(sender);
    getOutputWidth();
    getOutputRatioWidth();
    getOutputRatioHeight();
    getOutputHeight();
    getDuration();
    getMaxCellWidth();
    getCellRatioWidth();
    getCellRatioHeight();
    getColumnCount();
    getCellWidth();
    getCellHeight();
    getRowCount();
    getTotalCells();

    addBackground();

    console.log(formData);
    console.log(state);
    el.value = cmd;
  }
}

function addBackground() {
  cmd.push(
    "-i",
  );
  cmd.push(
    `color=c=black:s=${state.outputWidth}x${state.outputHeight}:d=${state.duration}:r=30`,
  );
}

function getDuration() {
  state.duration = parseInt(formData.get("duration"));
}

function getTotalCells() {
  state.totalCells = state.rowCount * state.columnCount;
}

function getRowCount() {
  state.rowCount = Math.floor(state.outputHeight / state.cellHeight);
  if (state.rowCount < 1) {
    state.rowCount = 1;
  }
}

function getCellHeight() {
  state.cellHeight = parseInt(
    state.cellWidth * state.cellRatioHeight / state.cellRatioWidth,
  );
  state.cellHeight += state.cellHeight % 2;
}

function getCellWidth() {
  state.cellWidth = Math.floor(state.outputWidth / state.columnCount);
  if (state.cellWidth > state.maxCellWidth) {
    state.columnCount += 1;
    state.cellWidth = Math.floor(state.outputWidth / state.columnCount);
  }
  state.cellWidth += state.cellWidth % 2;
}

function getMaxCellWidth() {
  state.maxCellWidth = parseInt(formData.get("maxCellWidth"));
}

function getColumnCount() {
  state.columnCount = Math.floor(state.outputWidth / state.maxCellWidth);
}

function getCellRatioHeight() {
  state.cellRatioHeight = parseInt(formData.get("cellRatioHeight"));
}

function getCellRatioWidth() {
  state.cellRatioWidth = parseInt(formData.get("cellRatioWidth"));
}

function getOutputHeight() {
  state.outputHeight = parseInt(
    state.outputWidth * state.outputRatioHeight / state.outputRatioWidth,
  );
  state.outputHeight += state.outputHeight % 2;
}

function getOutputWidth() {
  state.outputWidth = parseInt(formData.get("outputWidth"));
}

function getOutputRatioHeight() {
  state.outputRatioHeight = parseInt(formData.get("outputRatioHeight"));
}

function getOutputRatioWidth() {
  state.outputRatioWidth = parseInt(formData.get("outputRatioWidth"));
}