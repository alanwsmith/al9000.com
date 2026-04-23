require "/library/scripts"

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
    turtle.dropDown()
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
    sleepMin(4)
  end
end

main()
