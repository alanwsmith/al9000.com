require "/library/movement"
require "/library/refuel"
require "/library/unloadForward"

local cutRow = function() 
  for i = 1, 11 do
    forward()
  end
end

local cutPair = function()
  cutRow()
  turnRight()
  forward()
  turnRight()
  cutRow()
end

local cutKelp = function()
  for i = 1, 6 do
    cutPair()
    turnLeft()
    forward()
    turnLeft()
  end
  cutPair()
  turnRight()
  forward(13)
  turnRight()
end


while true do
  refuel()
  cutKelp()
  turnRight(2)
  unloadForward()
  turnRight(2)
  for i = 10, 1, -1 do
    print("Sleeing for " .. i .. " min.")
    os.sleep(60)
  end
end

