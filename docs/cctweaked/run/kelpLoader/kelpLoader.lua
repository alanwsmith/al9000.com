require "/library/movement"
require "/library/findSlotWithName"
require "/library/refuel"

local dropKelp = function()
  local slot = findSlotWithName("minecraft:kelp")
  if slot then
    turtle.dropDown(10)
  end
end

local loadKelp = function()
  local furnaceCount = 3
  for i = 1, 16 do
    turtle.suckUp()
  end
  for f = 1, furnaceCount do
    dropKelp()
    if f ~= furnaceCount then
      turtle.forward()
    end
  end
  back(furnaceCount - 1)
end

local main = function()
  while true
    refuel()
    if turtle.getFuelLevel() < 100 then
      print("Fuel below required amount. Skipping run.")
    else
      loadKelp()
    end
    for i=2,1,-1 do
      print("Sleeping for " .. i .. " min.")
      os.sleep(60)
    end
  end
end

main()