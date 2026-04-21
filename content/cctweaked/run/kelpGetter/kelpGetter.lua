-- DEPRECATED: This has been moved into
-- kelpCutter directly.



-- require "/library/movement"
-- require "/library/refuel"
-- require "/library/unloadForward"

-- local getRow = function() 
--   for i = 1, 11 do
--     forward()
--     -- doing a few times to make sure
--     -- until an inspection is added
--     -- if that's possible
--     turtle.suckDown()
--     turtle.suckDown()
--     turtle.suckDown()
--   end
-- end

-- local getPair = function()
--   getRow()
--   turnRight()
--   forward()
--   turtle.suckDown()
--   turtle.suckDown()
--   turtle.suckDown()
--   turnRight()
--   getRow()
-- end

-- local getKelp = function()
--   for i = 1, 6 do
--     getPair()
--     turnLeft()
--     forward()
--     turtle.suckDown()
--     turtle.suckDown()
--     turtle.suckDown()
--     turnLeft()
--   end
--   getPair()
--   turnRight()
--   forward(13)
--   turnRight()
-- end

local runIt = function()
  print("Sleeping for 2 min for offset")
  os.sleep(120)
  while true do
    refuel()
    getKelp()
    turnRight(2)
    unloadForward()
    turnRight(2)
    for i = 10, 1, -1 do
      print("Sleeing for " .. i .. " min.")
      os.sleep(60)
    end
  end
end

-- runIt()
