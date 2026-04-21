require "/library/movement"
require "/library/refuel"
require "/library/unloadForward"

local cutRow = function() 
  for i = 1, 11 do
    forward()
    -- doing a few times to make sure
    -- until an inspection is added
    -- if that's possible
    turtle.suckDown()
    turtle.suckDown()
    turtle.suckDown()
  end
end

local cutPair = function()
  cutRow()
  turnRight()
  forward()
  turtle.suckDown()
  turtle.suckDown()
  turtle.suckDown()
  turnRight()
  cutRow()
end

local cutKelp = function()
  for i = 1, 6 do
    cutPair()
    turnLeft()
    forward()
    turtle.suckDown()
    turtle.suckDown()
    turtle.suckDown()
    turnLeft()
  end
  cutPair()
  turnRight()
  forward(13)
  turnRight()
end

local runIt = function()
  print("Sleeping for 2 min for offset")
  os.sleep(120)
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
end

runIt()
