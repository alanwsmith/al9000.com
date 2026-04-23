require "/library/movement"
require "/library/findSlotWithName"

local levelFarmLand = function()
  for y=1,15, 1 do
    for x=1,16,1 do
      turtle.digDown()
      local itemSlot = findSlotWithName("minecraft:dirt")
      if itemSlot ~= nil then
        turtle.placeDown()
      end
      forward(1)
    end
    back(16)
    turnRight()
    forward(1)
    turnLeft()
  end
end


levelFarmLand()