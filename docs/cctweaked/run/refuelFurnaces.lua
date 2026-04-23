require "/library/scripts"

local loadFuel = function()
  -- add randomness so the front ones aren't
  -- the only ones to get filled when there's
  -- not enough to fill everything
  local slot = findSlotWithName("minecraft:dried_kelp_block")
  if slot then
    -- if math.random(1,2) == 1 then
      turtle.drop(6)
    -- end
  end
end

local refuelFurnaces = function() 
  local furnaceCount = 14
  for i = 1, 16 do
    turtle.suckDown()
  end
  for count = 1, furnaceCount do
    turnLeft()
    loadFuel()
    turnRight()
    if count < furnaceCount then
      turtle.forward()
    end
  end
  turnRight(2)
  for count = 1, furnaceCount - 1 do
    turtle.forward()
  end
  turnLeft(2)
end


local main = function()
  -- remember, don't call
  -- refuel here wihtout adding
  -- something to prevent it
  -- from consuing all the fuel
  -- you're trying to use to
  -- load the furnaces. 
  while true do
    lock()
    if turtle.getFuelLevel() < 100 then
      print("Fuel below required amount. Skipping run.")
    else
      refuelFurnaces()
    end
    unlock()
    -- this sleep time keeps the refilling
    -- ahead of the smelting. It means
    -- you'll need to pull kelp out of
    -- the furnaces to use in other
    -- places until they all fill up.
    sleepMin(5)
  end
end

main()
