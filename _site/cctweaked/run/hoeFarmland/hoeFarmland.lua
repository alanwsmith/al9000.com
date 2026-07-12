require "/library/movement"

local hoeRow = function()
  for i = 1, 15 do
    turtle.digDown()
    forward()
  end
  turtle.digDown()
end

local hoePair = function()
  hoeRow()
  turnRight()
  forward()
  turnRight()
  hoeRow()
end

local hoeFarmland = function() 
  for width = 1, 7 do
    hoePair()
    turnLeft()
    forward()
    turnLeft()
  end
  hoePair()
  turnRight()
  forward(15)
  turnRight()
end

up()
hoeFarmland()
