export const b = {
  init: "blocks",
};

export function blocks(_, __, el) {
  const elWidth = parseInt(el.getBoundingClientRect().width);
  const elHeight = parseInt(el.getBoundingClientRect().height);
  const itemWidth = getItemWidth(
    el.propAsInt("minWidth"),
    el.propAsInt("maxWidth"),
    elWidth,
  );

  console.log(elWidth);
  console.log(elHeight);
  console.log(itemWidth);
}

function getItemWidth(minWidth, maxWidth, containerWidth) {
  const maxItems = Math.floor(containerWidth / minWidth);
  const optimalWidth = Math.floor(containerWidth / maxItems);
  if (optimalWidth <= maxWidth) {
    return optimalWidth;
  }
  return maxWidth;
}

function _x3_getItemWidth(minWidth, maxWidth, containerWidth) {
  let bestWidth = minWidth;
  let bestCount = 0;

  // Try every possible width from maxWidth down to minWidth
  for (let width = maxWidth; width >= minWidth; width--) {
    const itemsPerRow = Math.floor(containerWidth / width);

    // If this width fits more items, or same items but larger width, update
    if (itemsPerRow > bestCount) {
      bestCount = itemsPerRow;
      bestWidth = width;
    }
  }

  return bestWidth;
}

function _x2_getItemWidth(minWidth, maxWidth, containerWidth) {
  let bestWidth = minWidth;
  let maxItems = Math.floor(containerWidth / minWidth);
  for (let numItems = maxItems; numItems >= 1; numItems--) {
    const width = Math.floor(containerWidth / numItems);
    if (width >= minWidth && width <= maxWidth) {
      return width;
    }
  }
  return minWidth;
}

function _x_getItemWidth(minWidth, maxWidth, containerWidth) {
  let optimalWidth = minWidth;
  let low = minWidth;
  let high = maxWidth;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const itemsPerRow = Math.floor(containerWidth / mid);
    if (itemsPerRow >= 1) {
      optimalWidth = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return optimalWidth;
}
