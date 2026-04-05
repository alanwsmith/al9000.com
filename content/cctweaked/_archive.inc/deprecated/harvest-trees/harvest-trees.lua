require "/_doesBlockHaveTag"
require "/_findSlotWithTag"
require "/_movement"

local get_wood = function()
  for move = 1, 10 do
    turtle.dig()
    while turtle.detectUp() do
      turtle.digUp()
    end
    up(1)
  end
  down(10)
end

local plant_sapling = function()
  if findSlotWithTag("minecraft:saplings") ~= nil then
    turtle.dig() -- clear snow, etc...
    turtle.place()
  end
end

local harvest_trees = function(trees)
  if turtle.getFuelLevel() > 200 then
    for loopNum = 1, trees do
      local has_block, data = turtle.inspect()
      if has_block then
        for key, val in pairs(data.tags) do
          if key == "minecraft:logs" then
            get_wood()
          end
        end
      end
      plant_sapling()
      left()
      forward(2)
      right()
    end
    right()
    forward(trees * 2)
    left()
  else
    print("Not enough fuel")
  end
end

print("How many trees")
local numberOfTrees = tonumber(io.read())
harvest_trees(numberOfTrees)
