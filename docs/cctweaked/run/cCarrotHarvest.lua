require "/library/movement"
require "/library/findSlotWithName"
require "/library/unloadDown"
require "/library/refuel"

local plantRow = function()
  for i=1,15,1 do
    local exists, data = turtle.inspectDown()
    if exists then
      if data.state.age == 7 then
        turtle.digDown()
        if findSlotWithName("minecraft:carrot") ~= nil then
          turtle.placeDown()
        end
      end  
    else
      if findSlotWithName("minecraft:carrot") ~= nil then
        turtle.placeDown()
      end
    end
    if i ~= 15 then
      forward(1)
    end
  end
end

local upAndBack = function()
  up(1)
  forward(1)
  plantRow()
  turnRight()
  forward(1)
  turnRight()
  plantRow()
  forward(1)
  down(1)
  unloadDown()
end

local doHarvest = function()
  for i=1,8,1 do
    upAndBack()
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

while true do
  refuel()
  if turtle.getFuelLevel() < 500 then
    print("Fuel below required amount. Skipping run.")
  else
    doHarvest()
  end
  for i=10,1,-1 do
    print("Sleeping for " .. i .. " min.")
    os.sleep(60)
  end
end


