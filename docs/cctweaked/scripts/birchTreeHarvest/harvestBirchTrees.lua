require "/library/movement"
require "/library/doesBlockHaveTag"
require "/library/findSlotWithTag"


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
  for i=1,7,1 do
    cutDownBirch()
    turnLeft()
    forward(2)
    turnRight()
  end
  cutDownBirch()
  turnRight()
  forward(14)
  turnLeft()
end


-- harvestBirchTrees = function()
--   for i=1,7,1 do
--     cutDownBirch()
--     turnLeft()
--     forward(2)
--     turnRight()
--   end
-- end

local harvestRows = function()
  for i=1,7,1 do
    harvestRow()
    forward(2)
  end
  back(14)
end

harvestRows()





-- harvestBirchTrees()





