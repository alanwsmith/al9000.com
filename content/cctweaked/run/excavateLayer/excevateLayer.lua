require "/library/movement"
require "/library/refuel"
require "/library/ejectExtras"
require "/library/findSlotWithName"

local excavateLine = function(count)
  ejectExtras()
  for i=1,16,1 do
    if i ~= 1 then
      forward(1)
    end
    turtle.digDown()
    turtle.digUp()
    if count % 3 == 0 then
      if i % 6 == 0 then
        findSlotWithName("minecraft:torch")
        turtle.placeDown()
        turtle.select(1)
      end
    end
  end
end

local excavateLayer = function()
  for i=1,8,1 do
    excavateLine(i)
    turnRight()
    forward(1)
    turnRight()
    excavateLine(1) -- don't put down torch
    if i < 8 then
      turnLeft()
      forward(1)
      turnLeft()
    else
      turnRight()
      forward(15)
      turnRight()
    end
  end
end


refuel()
excavateLayer()

