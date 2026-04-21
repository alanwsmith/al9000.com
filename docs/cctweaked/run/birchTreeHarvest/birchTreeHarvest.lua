require "/library/movement"
require "/library/doesBlockHaveTag"
require "/library/findSlotWithTag"
require "/library/findSlotWithName"
require "/library/refuel"

local chopTree = function()
  local maxHeight = 7
  for height = 1, maxHeight do
    turtle.dig()
    up(1)
  end
  down(maxHeight)
end

local plantSapling = function()
  if findSlotWithTag("minecraft:saplings") ~= nil then
    turtle.dig() -- clear snow, etc...
    turtle.place()
  end
end

local cutDownBirch = function()
  if doesBlockHaveTag("minecraft:logs") then
    print("Found tree")
    chopTree()
  elseif doesBlockHaveTag("minecraft:saplings") then
    print("Removing sapling")
    turtle.dig()
  end
end

local harvestRow = function() 
  for i=1,5,1 do
    cutDownBirch()
    turnLeft()
    forward(3)
    turnRight()
  end
  cutDownBirch()
  turnRight()
  forward(15)
  turnLeft()
end

local harvestRows = function()
  for i=1,5,1 do
    harvestRow()
    forward(3)
  end
  back(15)
end


local plantRow = function()
  turnLeft()
  for i=1,6,1 do
    findSlotWithName("minecraft:birch_sapling")
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


while true do 
  refuel()
  harvestRows()
  -- 5min lets basically all the 
  -- leaves despawn
  for i = 5, 1, -1 do
    print("Sleeping for " .. i .. " min.")
    os.sleep(60)
  end
  moveToStart()
  plantRows()
  moveToEnd()
  print("Remember to restock saplings")
  -- Tested a few times and 25min
  -- seems pretty solid
  for i = 1, 25 do
    print("Have slept for " .. i .. " min.")
    os.sleep(60)
  end
end
