require "/_movement"
require "/_doesBlockHaveTag"
require "/_findSlotWithTag"

local getWood = function()
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

local harvest = function()
  if doesBlockHaveTag("minecraft:logs") then
    print("Found tree")
    getWood()
    plantSapling()
  elseif doesBlockHaveTag("minecraft:saplings") then
    print("Found sapling")
  else
    plantSapling()
  end
end

local harvestLine = function(rows)
  for row = 1, rows do
    turnLeft()
    harvest()
    turnRight()
    if row ~= rows then
      forward(3)
    end
  end
end


local rows = 18
print("Harevsting Trees")
harvestLine(rows)
turnRight()
forward(1)
turnRight()
harvestLine(rows)
turnRight()
forward(1)
turnRight()


print("Completed: harvestTrees")
shell.run("menu")
