require "/library/movement"
require "/library/findSlotWithName"
require "/library/refuel"

local getKelp = function()
  local upCount = 4
  local downCount = upCount - 1
  for i = 1, upCount do
    turnLeft()
    for i = 1, 16 do
      turtle.suck()
    end
    turnRight()
    if i < upCount then
      up(3)
    end
  end
  for i = 1, downCount do
    down(3)
  end
end

local dropKelp = function()
  local slot = findSlotWithName("minecraft:kelp")
  if slot then
    -- drop 20 which is the amount one
    -- block of dried kelp can smelt
    turtle.dropDown(20)
  end
end

local loadKelp = function()
  local furnaceCount = 14
  local backCount = furnaceCount - 1
  for f = 1, furnaceCount do
    dropKelp()
    if f ~= furnaceCount then
      turtle.forward()
    end
  end
  back(backCount)
end

local main = function()
  while true do
    refuel()
    if turtle.getFuelLevel() < 100 then
      print("Fuel below required amount. Skipping run.")
    else
      getKelp()
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
