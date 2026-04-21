-- DEPRECATED: This is now done
-- directly in the harvest script.

-- require "/library/movement"
-- require "/library/findSlotWithName"
-- require "/library/refuel"

-- local plantRow = function()
--   turnLeft()
--   for i=1,6,1 do
--     findSlotWithName("minecraft:birch_sapling")
--     turtle.placeDown()
--     forward(3)
--   end
--   back(18)
--   turnRight()
-- end

-- local plantRows = function()
--   for i=1,5,1 do
--     plantRow()
--     forward(3)
--   end
--   back(15)
-- end

-- local moveToStart = function()
--   up(1)
--   forward(1)
-- end

-- local moveToEnd = function()
--   back(1)
--   down(1)
-- end

-- refuel()
-- moveToStart()
-- plantRows()
-- moveToEnd()

