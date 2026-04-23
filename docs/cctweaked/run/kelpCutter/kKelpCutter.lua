require "/library/scripts"

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

local main = function()
  while true do
    lock()
    print("Starting kelp cutting run")
    refuel()
    if turtle.getFuelLevel() < 400 then
      print("Fuel below required amount. Skipping run.")
    else
      cutKelpLayer()
    end
    unlock()
    print("Sleeping for " .. 1 .. " min.")
    os.sleep(60)
  end
end

main()