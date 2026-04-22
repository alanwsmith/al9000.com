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

local cutKelpLayer = function()
  for i = 1, 6 do
    cutPair()
    turnLeft()
    forward()
    turnLeft()
  end
  cutPair()
  turnRight()
  forward(13)
  turnLeft(1)
  unloadForward()
  turnRight(2)
end

-- local cutKelp = function()
--   cutKelpLayer()
--   up(3)
--   cutKelpLayer()
--   up(3)
--   cutKelpLayer()
--   down(6)
--   turnRight(2)
--   unloadForward()
--   turnLeft(2)
-- end


local main = function()
  while true do
    print("Staring run")
    refuel()
    if turtle.getFuelLevel() < 400 then
      print("Fuel below required amount. Skipping run.")
    else
      os.sleep(1)
      cutKelpLayer()
    end
    print("Sleeping for " .. 1 .. " min.")
    os.sleep(60)
  end
end


main()