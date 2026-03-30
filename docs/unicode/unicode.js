export const b = {
  init: "addCharacters",
};

let state = {
  cellsAdded: false,
  current: 33,
  end: 126686,
  // end: 3686,
};

export async function addCharacters(_, __, el) {
  if (state.cellsAdded === false) {
    b.trigger("characters");
    //state.cellsAdded = true;
    //const characterEls = [];
    //for (let c = 33; c <= 1000; c++) {
    //  //for (let c = 33; c <= 126686; c++) {
    //  const hex = c.toString(16);
    //  //const unicodeCode = `#x${hex};`;
    //  characterEls.push(b.render("characterTemplate", {
    //    __HEX__: hex,
    //  }));
    //  //charEl.innerHTML = `&${unicodeCode} `;
    //  //      el.appendChild(charEl);
    //}
    // el.replaceChildren(b.render("displayTemplate", {
    //   __CHARACTERS__: characterEls,
    // }));
  }
}

export async function characters(_, __, el) {
  if (state.current <= state.end) {
    const count = Math.min(state.end - state.current + 1, 500);
    const numbers = Array.from({ length: count }, (_, i) => i + state.current);
    el.appendChild(b.render("displayTemplate", {
      __CHARACTERS__: numbers.map((num) => span(num)),
    }));
    state.current = state.current + count;
    if (state.current !== state.end) {
      await b.sleep(100);
      b.trigger("characters");
    }
  }
}

function span(number) {
  const hex = number.toString(16);
  return b.render("characterTemplate", {
    __CHARACTER__: `&#x${hex};`,
    //__CHARACTER__: ``,
    //__CHARACTER__: isAvailable(hex) ? "x" : "y",
    __HIDDEN__: isAvailable(hex) ? "" : "hidden",
  });
}

function isAvailable(
  hex,
  font = getComputedStyle(document.body).fontFamily,
  recursion = false,
) {
  const character = String.fromCodePoint(`0x${hex}`);
  let testCanvas = document.createElement("canvas");
  let referenceCanvas = document.createElement("canvas");
  testCanvas.width =
    referenceCanvas.width =
    testCanvas.height =
    referenceCanvas.height =
      50;
  let testContext = testCanvas.getContext("2d");
  let referenceContext = referenceCanvas.getContext("2d");
  testContext.font = referenceContext.font = "30px " + font;
  testContext.fillStyle = referenceContext.fillStyle = "black";
  testContext.fillText(character, 0, 30);
  referenceContext.fillText("\uffff", 0, 30);
  // Taking out the firefox attempt since it's not working
  // for me.
  // if (!recursion && characterIsSupported("\ufffe", font, true)) {
  //   testContext.fillStyle = referenceContext.fillStyle = "black";
  //   testContext.fillRect(10, 10, 80, 80);
  //   referenceContext.fillRect(10, 10, 80, 80);
  // }
  return testCanvas.toDataURL() != referenceCanvas.toDataURL();
}

//export async function outputCharacter(_, __, el) {
//  el.innerHTML = `&#x${el.prop("hex")};`;
//  //el.innerHTML = `${el.prop("hex")`;
//}
//

//// ORIGINAL CODE FROM: https://stackoverflow.com/a/63520666/102401
////The first argument is the character you want to test, and the second argument is the font you want to test it in.
////If the second argument is left out, it defaults to the font of the <body> element.
////The third argument isn't used under normal circumstances, it's just used internally to avoid infinite recursion.
//function characterIsSupported(
//  character,
//  font = getComputedStyle(document.body).fontFamily,
//  recursion = false,
//) {
//  //Create the canvases
//  let testCanvas = document.createElement("canvas");
//  let referenceCanvas = document.createElement("canvas");
//  testCanvas.width =
//    referenceCanvas.width =
//    testCanvas.height =
//    referenceCanvas.height =
//      150;
//  //Render the characters
//  let testContext = testCanvas.getContext("2d");
//  let referenceContext = referenceCanvas.getContext("2d");
//  testContext.font = referenceContext.font = "100px " + font;
//  testContext.fillStyle = referenceContext.fillStyle = "black";
//  testContext.fillText(character, 0, 100);
//  referenceContext.fillText("\uffff", 0, 100);
//  //Firefox renders unsupported characters by placing their character code inside the rectangle making each unsupported character look different.
//  //As a workaround, in Firefox, we hide the inside of the character by placing a black rectangle on top of it.
//  //The rectangle we use to hide the inside has an offset of 10px so it can still see part of the character, reducing the risk of false positives.
//  //We check for Firefox and browers that behave similarly by checking if U+FFFE is supported, since U+FFFE is, just like U+FFFF, guaranteed not to be supported.
//  if (!recursion && characterIsSupported("\ufffe", font, true)) {
//    testContext.fillStyle = referenceContext.fillStyle = "black";
//    testContext.fillRect(10, 10, 80, 80);
//    referenceContext.fillRect(10, 10, 80, 80);
//  }
//  //Check if the canvases are identical
//  return testCanvas.toDataURL() != referenceCanvas.toDataURL();
//}
