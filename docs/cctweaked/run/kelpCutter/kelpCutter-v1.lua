-- DEPRECATED - this is the one
-- that skims the top. Moving
-- to a new one that has multiple
-- layers that are all underwater. 



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


local getRow = function() 
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

local getPair = function()
  getRow()
  turnRight()
  forward()
  turtle.suckDown()
  turtle.suckDown()
  turtle.suckDown()
  turnRight()
  getRow()
end

local getKelp = function()
  for i = 1, 6 do
    getPair()
    turnLeft()
    forward()
    turtle.suckDown()
    turtle.suckDown()
    turtle.suckDown()
    turnLeft()
  end
  getPair()
  turnRight()
  forward(13)
  turnRight()
end

local runIt = function()
  -- subtrack 1 from tank height
  -- to pad for kelp root that
  -- should not be removed.
  local tankHeight = 6
  cutKelp()
  for u = 1, tankHeight do
    turtle.up()
  end
  getKelp()
  for d = 1, tankHeight do
    turtle.down()
  end
  turnRight(2)
  unloadForward()
  turnRight(2)
end

local main = function()
  while true do
    refuel()
    if turtle.getFuelLevel() < 500 then
      print("Fuel below required amount. Skipping run.")
    else
      runIt()
    end
    for i=4, 1, -1 do
      print("Sleeping for " .. i .. " min.")
      os.sleep(60)
    end
  end
end

main()

