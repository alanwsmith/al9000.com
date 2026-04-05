require "/_findSlotWithNames"

placeFloor = function()
  local has_block, data = turtle.inspectDown()
  if has_block == false then
    local slot = findSlotWithNames({
      "minecraft:cobbled_deepslate",
      "minecraft:cobblestone",
      "minecraft:dirt",
      "minecraft:grass_block",
      "minecraft:stone",
      "minecraft:tuff",
    })
    if slot then
      turtle.placeDown()
    end
  end
end
