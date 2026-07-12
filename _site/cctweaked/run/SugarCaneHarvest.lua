-- Harvests a 14x14 plot of Sugar Cane
-- inside a 16x16 chunk that leaves one block
-- on the outside to put blocks that keep
-- the sugare cane from falling outside
-- the pickup area. 

-- Operates one level above the land so
-- replanting isn't necessary. 

-- Does a suckDown while making its
-- pass to pick up anything that hit the
-- ground. 

-- Drops the can in a chest at 1x1.

-- Makes sure there is enough fuel
-- before each run.

-- Starts up automatically if
-- its safe to do so.

-- NOTE: The original version made
-- two passes to pick up items
-- that landed on the ground. There's
-- just not that many of them though.
-- The feature was removed to save
-- fuel.

-- NOTE: 18 Minutes is the average
-- time for a block of sugar cane
-- to grow. That's what's used
-- for the sleep time. 


require "/library/scripts"

local harvestRow = function() 
  for i = 1, 13 do
    forward()
    turtle.suckDown()
  end
end

local harvestPair = function()
  harvestRow()
  turnRight()
  forward()
  turnRight()
  harvestRow()
end

local harvestLayer = function()
  for i = 1, 6 do
    harvestPair()
    turnLeft()
    forward()
    turnLeft()
  end
  harvestPair()
  turnRight()
  forward(13)
  turnRight()
end

local main = function()
  while true do
    print("Starting Run: SugarCaseHarvest")
    lock()
    checkFuelLevel(500, true)
    harvestLayer()
    unloadDown()
    unlock()
    sleepMin(18)
  end
end

main()

