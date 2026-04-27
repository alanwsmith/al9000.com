-- Explorers chunks by cutting
-- hallways in them so you can 
-- walk them to look for ores
-- to get with a pick axe with 
-- Fortune on it since you can't
-- enchant the picks that the
-- turtles use. 

-- Start the turtle at spot 1x1
-- at head level. 

-- It carves 
-- down one block as it goes. 

-- The turtle places 
-- torches in the middle of
-- every hallway to provide
-- light. 

-- TODO: The turtle makes
-- sure it has some torches 
-- before starting

require "/library/scripts"

local cutRow = function()
  shortHall(15)
  turtle.digDown()
  ejectExtras()
end

local cutPair = function()
  cutRow()
  turnRight()
  shortHall(3)
  turnRight()
  cutRow()
end

local cutChunk = function()
  for i = 1, 2 do
    cutPair()
    turnLeft()
    shortHall(3)
    turnLeft()
  end
  cutPair()
  turnRight()
  forward(15)
  turnRight()
end

local main = function()
  for i = 1, 3 do
    lock()
    refuel()
    cutChunk()
    forward(16)
    unlock()
  end
end

main()

