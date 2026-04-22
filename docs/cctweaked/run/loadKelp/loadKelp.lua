require "/library/movement"
require "/library/findSlotWithName"
require "/library/refuel"

local dropKelp = function()
  local slot = findSlotWithName("minecraft:kelp")
  if slot then
    -- drop 20 which is the amount one
    -- block of dried kelp can smelt
    turtle.dropDown(20)
  end
end

local loadKelp = function()
  local furnaceCount = 13
  turnRight(2)
  for i = 1, 16 do
    turtle.suck()
  end
  turnLeft(2)
  for f = 1, furnaceCount do
    dropKelp()
    if f ~= furnaceCount then
      turtle.forward()
    end
  end
  back(furnaceCount - 1)
end

local main = function()
  while true do
    refuel()
    if turtle.getFuelLevel() < 100 then
      print("Fuel below required amount. Skipping run.")
    else
      loadKelp()
    end
    -- 2 min lets thing refill but
    -- moves fast enough that if there's
    -- kelp the flames don't go out.
    for i = 2, 1, -1 do
      print("Sleeping for " .. i .. " min.")
      os.sleep(60)
    end
  end
end

main()
