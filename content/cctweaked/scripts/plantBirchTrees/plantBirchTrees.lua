require "/library/movement"



local plantRow = function()
  turnLeft()
  for i=1,6,1 do
    turtle.placeDown()
    forward(3)
  end
  back(18)
  turnRight()
end

local plantRows = function()
  for i=1,5,1 do
    plantRow()
    forward(3)
  end
  back(15)
end

local moveToStart = function()
  up(1)
  forward(1)
end

local moveToEnd = function()
  back(1)
  down(1)
end

moveToStart()
plantRows()
moveToEnd()

