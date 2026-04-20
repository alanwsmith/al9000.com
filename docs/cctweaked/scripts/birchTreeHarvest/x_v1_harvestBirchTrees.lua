require "/library/movement"
require "/library/doesBlockHaveTag"
require "/library/findSlotWithTag"


local chopTree = function()
  local maxHeight = 8
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

cutDownBirch = function()
  if doesBlockHaveTag("minecraft:logs") then
    print("Found tree")
    chopTree()
    plantSapling()
  elseif doesBlockHaveTag("minecraft:saplings") then
    print("Found sapling")
  else
    plantSapling()
  end
end


harvestBirchTrees = function()
  for i=1,7,1 do
    cutDownBirch()
    turnLeft()
    forward(2)
    turnRight()
  end
end

harvestBirchTrees()





