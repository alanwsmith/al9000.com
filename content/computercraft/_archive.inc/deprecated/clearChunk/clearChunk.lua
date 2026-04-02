require "/_movement"
require "/_getSlotItemName"

clearChunk = function(x, y)
  if turtle.getFuelLevel() > 400 then
    up(1)
    for yStep = 1, y do
      for slot = 1, 16 do
        local slotItemName = getSlotItemName(slot)
        if slotItemName == "minecraft:cobbled_deepslate" then
          turtle.select(slot)
          turtle.drop()
        end
        if slotItemName == "minecraft:cobblestone" then
          turtle.select(slot)
          turtle.drop()
        end
        if slotItemName == "minecraft:tuff" then
          turtle.select(slot)
          turtle.drop()
        end
      end

      for xStep = 1, x do
        forward(1)
        digUp()
        digDown()
      end
      if yStep % 2 == 0 then
        left()
        forward(1)
        digUp()
        digDown()
        left()
      else
        right()
        forward(1)
        digUp()
        digDown()
        right()
      end
    end

    if y % 2 == 1 then
      left()
      back(y)
      left()
    else
      right()
      back(y)
      right()
    end
    down(1)
    right()
    right()
  else
    print("not enough fuel")
  end
end

clearChunk(32, 32)
