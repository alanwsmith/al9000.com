-- Start the turtle on the floor and
-- it'll cut a three tall hallway
-- with torches if any are available

require "/_movement"
require "/_findSlotWithName"

local placeTorch = function()
  local torchSlot = findSlotWithName("minecraft:torch")
  if torchSlot then
    forward(1)
    back(1)
    turtle.place()
  end
end

cutHall = function(steps)
  up(1)
  for step = 1, steps do
    forward(1)
    digUp()
    digDown()
    if step % 8 == 0 then
      left()
      placeTorch()
      right()
    end
  end
  back(steps)
  down(1)
end

print("How far should I go")
local steps_to_go = tonumber(io.read())
cutHall(steps_to_go)
