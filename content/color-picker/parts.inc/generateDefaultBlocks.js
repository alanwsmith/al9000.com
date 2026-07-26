function generateDefaultBlocks() {
  s.data.blocks = {};
  s.data.colorTypes.forEach((colorType) => {
    s.data.blocks[colorType] = {};
    s.data.colorNames.forEach((colorName) => {
      s.data.blocks[colorType][colorName] = {
        text: ["default", "base"],
        background: [colorType, colorName],
        border: [colorType, colorName],
      };
    });
    s.data.monoNames.forEach((colorName) => {
      s.data.blocks[colorType][colorName] = {
        text: ["default", "base"],
        background: [colorType, colorName],
        border: [colorType, colorName],
      };
    });
  });
  b.info(s.data.blocks);
}
