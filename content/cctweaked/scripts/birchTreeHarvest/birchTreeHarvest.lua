require "/library/movement"
require "/library/doesBlockHaveTag"
require "/library/findSlotWithTag"
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

refuel()
harvestRows()

