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



refuel()
harvestRows()
for i = 7, 1, -1 do
  print("Sleeping for " .. i .. " min.")
  os.sleep(60)
end
moveToStart()
plantRows()
moveToEnd()


-- this is to figure out how long 
-- to wait before the next run
for i = 1, 20 do
  print("Have slept for " .. i .. " min.")
  os.sleep(60)
end
