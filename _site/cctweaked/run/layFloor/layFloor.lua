-- TODO: Lays a floor of the given type.

-- Starts by asking for a length
-- and width. 

-- Lenght and width must be even
-- so up and back works. 

-- Checks to see if there's enough
-- fuel to run.

-- Check to see if there's enough
-- of the given block type to finish. 

-- Starts on the block it's on as
-- the 1x1 position of the grid.

-- TODO: Place some torches?


require "/library/movement"
require "/library/findSlotWithName"
require "/library/getEvenNumber"
require "/library/checkFuelLevel"
require "/library/checkMats"


local layRow = function(block, length)
  for i = 1, length do
    turtle.digDown()
    findSlotWithName(block)
    turtle.placeDown()
    if i < length then
      forward(1)
    end
  end
end


local layPair = function(block, length)
  layRow(block, length)
  turnRight()
  forward()
  turnRight()
  layRow(block, length)
end


local main = function() 
  checkFuelLevel(500, true)
  local block = "minecraft:cobbled_deepslate"
  block = "minecraft:stone"
  block = "minecraft:dirt"
  local length = getEvenNumber("How long?")
  local width = getEvenNumber("How wide?")
  if checkMats(block, length, width) == true then
    for i = 1, width, 2 do
      layPair(block, length)
      if i < width - 1 then
        turnLeft()
        forward()
        turnLeft()
      end
    end
    turnRight()
    forward(width - 1)
    turnRight()
  end
  print("Process complete.")
end

main()