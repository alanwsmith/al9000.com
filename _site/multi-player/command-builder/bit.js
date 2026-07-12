export const b = {};

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

    const cmd = buildFfmpegCommand(
      state.outputWidth,
      [state.outputRatioWidth, state.outputRatioHeight],
      [state.cellRatioWidth, state.cellRatioHeight],
      state.maxCellWidth,
      state.duration,
      formData.get("primaryColumn"),
      formData.get("primaryRow"),
      "input.webm",
      "output.webm",
    );

    el.value = cmd.join(" ");
    // addBackground();
    // addCells();
    // addDurations();

    // console.log(formData);
    // console.log(state);
    // el.value = cmd.join(" ");
  }
}

function addDurations() {
  const filters = [];

  for (let i = 0; i < state.totalCells; i++) {
    const col = i % state.columnCount;
    const row = Math.floor(i / state.columnCount);
    const manhattan = Math.abs(col - formData.get("primaryColumn")) +
      Math.abs(row - formData.get("primaryRow"));
    const delay = manhattan * 0.17;
    const cellIndex = i + 1; // this makes index 0 the background
    if (delay > 0) {
      filters.push(
        `[${cellIndex}:v]trim=0:${state.duration},setpts=PTS+${delay}/TB,`,
      );
      filters.push(
        `scale=${state.cellWidth}:${state.cellHeight},setsar=1[v${i}]`,
      );
    } else {
      filters.push(
        `[${cellIndex}:v]trim=0:${state.duration},setpts=PTS-STARTPTS,`,
      );
      filters.push(
        `scale=${state.cellWidth}:${state.cellHeight},setsar=1[v${i}]`,
      );
    }
  }

  let prev = "0:v";

  for (let i = 0; i < state.totalCells; i++) {
    const col = i % state.columnCount;
    const row = Math.floor(i / state.columnCount);
    const x = col * state.cellWidth;
    const y = row * state.cellHeight;
    let out_label = `bg${i}`;
    if (i === state.totalCells - 1) {
      out_label = "vout";
    }
    filters.push(
      `[${prev}][v${i}]overlay=x=${x}:y=${y}:eof_action=pass[${out_label}]`,
    );
    prev = out_label;
  }

  // primary_index = primary_row * cols + primary_col
  // primary_input_idx = primary_index + 1
  // filters.append(
  //     f"[{primary_input_idx}:a]atrim=0:{duration},asetpts=PTS-STARTPTS[aout]"
  // )

  const filter_complex = filters.join(";");

  cmd.push("-filter_complex");
  cmd.push(filter_complex);
  cmd.push("-map");
  cmd.push("[vout]");
  cmd.push("-map");
  cmd.push("[aout]");
  cmd.push("-t", state.duration);
  cmd.push("-c:v", "libvpx-vp9", "-crf", "28", "-c:a", "libopus");
  cmd.push(formData.get(`outputFile`));
}

function addCells() {
  for (let i = 0; i < state.totalCells; i++) {
    cmd.push("-i");
    cmd.push(formData.get("inputFile"));
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
  return state.totalCells = state.rowCount * state.columnCount;
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

function buildFfmpegCommand(
  outputWidth,
  outputAspect,
  overlayAspect,
  maxOverlayWidth,
  duration,
  primaryCol,
  primaryRow,
  inputVideo,
  outputFile = "output.mp4",
) {
  // --- Compute output dimensions ---
  const [ow, oh] = outputAspect;
  let outputHeight = Math.floor(outputWidth * oh / ow);
  // Make height even for codec compatibility
  outputHeight += outputHeight % 2;

  // --- Compute grid layout ---
  const [iw, ih] = overlayAspect;
  let cols = Math.floor(outputWidth / maxOverlayWidth);
  if (cols < 1) {
    cols = 1;
  }
  let cellWidth = Math.floor(outputWidth / cols);
  // Ensure cell width doesn't exceed max
  if (cellWidth > maxOverlayWidth) {
    cols += 1;
    cellWidth = Math.floor(outputWidth / cols);
  }
  let cellHeight = Math.floor(cellWidth * ih / iw);
  // Make dimensions even
  cellWidth += cellWidth % 2;
  cellHeight += cellHeight % 2;

  let rows = Math.floor(outputHeight / cellHeight);
  if (rows < 1) {
    rows = 1;
  }

  const totalCells = rows * cols;

  if (
    primaryCol < 0 || primaryCol >= cols || primaryRow < 0 || primaryRow >= rows
  ) {
    throw new Error(
      `Primary cell (${primaryCol}, ${primaryRow}) is out of bounds for a ${cols}x${rows} grid`,
    );
  }

  console.log(`Output: ${outputWidth}x${outputHeight}`);
  console.log(`Grid: ${cols} cols x ${rows} rows (${totalCells} cells)`);
  console.log(`Cell size: ${cellWidth}x${cellHeight}`);
  console.log(`Primary cell: col=${primaryCol}, row=${primaryRow}`);

  // --- Build ffmpeg command ---
  const cmd = ["ffmpeg", "-y"];

  // Input 0: black background
  cmd.push(
    "-f",
    "lavfi",
    "-i",
    `color=c=black:s=${outputWidth}x${outputHeight}:d=${duration}:r=30`,
  );

  // Inputs 1..N: one per grid cell
  for (let i = 0; i < totalCells; i++) {
    cmd.push("-i", inputVideo);
  }

  // --- Build filter_complex ---
  const filters = [];

  // Scale each cell input and apply delay (with trimming to duration)
  for (let i = 0; i < totalCells; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const manhattan = Math.abs(col - primaryCol) + Math.abs(row - primaryRow);
    const delaySec = manhattan * 0.17;

    const inputIdx = i + 1; // 0 is the background

    // Video: trim, set delay via PTS shift, then scale
    if (delaySec > 0) {
      filters.push(
        `[${inputIdx}:v]trim=0:${duration},setpts=PTS+${delaySec}/TB,` +
          `scale=${cellWidth}:${cellHeight},setsar=1[v${i}]`,
      );
    } else {
      filters.push(
        `[${inputIdx}:v]trim=0:${duration},setpts=PTS-STARTPTS,` +
          `scale=${cellWidth}:${cellHeight},setsar=1[v${i}]`,
      );
    }
  }
  // Overlay each cell onto the background one by one
  let prev = "0:v";
  for (let i = 0; i < totalCells; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = col * cellWidth;
    const y = row * cellHeight;
    let outLabel = `bg${i}`;
    if (i === totalCells - 1) {
      outLabel = "vout";
    }
    filters.push(
      `[${prev}][v${i}]overlay=x=${x}:y=${y}:eof_action=pass[${outLabel}]`,
    );
    prev = outLabel;
  }
  // Audio: use only the primary cell's audio, with no delay (it starts at 0)
  const primaryIndex = primaryRow * cols + primaryCol;
  const primaryInputIdx = primaryIndex + 1;
  filters.push(
    `[${primaryInputIdx}:a]atrim=0:${duration},asetpts=PTS-STARTPTS[aout]`,
  );
  const filterComplex = filters.join(";\n");
  cmd.push("-filter_complex", filterComplex);
  cmd.push("-map", "[vout]", "-map", "[aout]");
  cmd.push("-t", String(duration));
  cmd.push("-c:v", "libvpx-vp9", "-crf", "28", "-c:a", "libopus");
  cmd.push(outputFile);
  return cmd;
}

function main() {
  const files = [
    {
      id: "0a0554c8-e6ab-40d8-854e-1cc190a00842",
      time: 10,
      dimensions: [16, 9],
    },
    {
      id: "06e880e9-d204-4715-a89d-c5997fe59a84",
      time: 10,
      dimensions: [16, 9],
    },
    {
      id: "28560a05-6053-4a98-9051-3d0800cf2a51",
      time: 224,
      dimensions: [16, 9],
    },
    {
      id: "4126931d-d2f1-469e-a90a-a45ecaf48cbb",
      time: 251,
      dimensions: [16, 9],
      input_path:
        "/Users/alan/workshop/assets-al9000/source/001-raw-workshop/multi-player/cropped-and-resized/16x9/4126931d-d2f1-469e-a90a-a45ecaf48cbb.webm",
    },
    {
      id: "45f3228e-af0d-4f7a-919c-07cee4d315f0",
      time: 215,
      dimensions: [16, 9],
      input_path:
        "/Users/alan/workshop/assets-al9000/source/001-raw-workshop/multi-player/cropped-and-resized/16x9/45f3228e-af0d-4f7a-919c-07cee4d315f0.webm",
    },
    {
      id: "a436f3a0-b408-42e1-9af4-6bfa71d92f59",
      time: 64,
      dimensions: [2.3564, 1],
      input_path:
        "/Users/alan/workshop/assets-al9000/source/001-raw-workshop/multi-player/cropped-and-resized/2-3564x1/a436f3a0-b408-42e1-9af4-6bfa71d92f59.webm",
    },
    {
      id: "b3e46f26-7c36-4ba9-ab0d-320bf0210b2d",
      time: 10,
      dimensions: [16, 9],
    },
    {
      id: "bcf6fbe2-4852-4510-9cac-4a2c75c7bf1e",
      time: 10,
      dimensions: [16, 9],
    },
    {
      id: "d9118939-807a-46c8-904c-39658cab52b5",
      time: 211,
      dimensions: [16, 9],
      input_path:
        "/Users/alan/workshop/assets-al9000/source/001-raw-workshop/multi-player/cropped-and-resized/16x9/d9118939-807a-46c8-904c-39658cab52b5.webm",
    },
    {
      id: "db23297f-d8db-4616-a150-169839a7a3ba",
      time: 231,
      dimensions: [16, 9],
      input_path:
        "/Users/alan/workshop/assets-al9000/source/001-raw-workshop/multi-player/cropped-and-resized/16x9/db23297f-d8db-4616-a150-169839a7a3ba.webm",
    },
    {
      id: "fc81dcf3-f2fa-4f7c-ac2d-8c9ef9ddae0f",
      time: 10,
      dimensions: [16, 9],
    },
  ];

  const inDir =
    "/Users/alan/workshop/assets-al9000/source/001-raw-workshop/multi-player/full-size/16x9";
  const outDir = "/Users/alan/Desktop";

  const fileIndex = 8;
  const primaryCol = 4;
  const primaryRow = 2;
  const vid = files[fileIndex];
  // ---- Configuration ----
  const outputWidth = 3840;
  const outputAspect = [16, 9];
  const overlayAspect = [vid.dimensions[0], vid.dimensions[1]];
  const maxOverlayWidth = 460;
  const duration = vid.time;
  let inputVideo = vid.input_path;
  let outputFile = `${outDir}/${vid.id}.webm`;
  // Override from CLI args if provided
  if (process.argv.length >= 3) {
    inputVideo = process.argv[2];
  }
  if (process.argv.length >= 4) {
    outputFile = process.argv[3];
  }
  const cmd = buildFfmpegCommand(
    outputWidth,
    outputAspect,
    overlayAspect,
    maxOverlayWidth,
    duration,
    primaryCol,
    primaryRow,
    inputVideo,
    outputFile,
  );
  console.log("\n--- ffmpeg command ---");
  console.log(cmd.join(" "));
  console.log();
  try {
    execSync(cmd.join(" "), { stdio: "inherit" });
  } catch (error) {
    console.error("ffmpeg command failed:", error.message);
    process.exit(1);
  }
}