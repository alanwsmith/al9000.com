require "/library/movement"
require "/library/findSlotWithName"
require "/library/refuel"

local unloadKelp = function()
  local furnaceCount = 13
  for f = 1, furnaceCount do
    turtle.suckUp()
    if f ~= furnaceCount then
      turtle.forward()
    end
  end
  turnRight(2)
  for f = 1, furnaceCount - 1 do
    turtle.forward()
  end
  for slot = 1, 16 do
    turtle.select(slot)
    turtle.drop()
  end
  turnRight(2)
end


local main = function()
  while true do
    refuel()
    if turtle.getFuelLevel() < 100 then
      print("Fuel below required amount. Skipping run.")
    else
      unloadKelp()
    end 
    -- 4 min is how long it takes to 
    -- smelt a batch of kelp (with
    -- a little padding thrown in)
    for i = 4, 1, -1 do
      print("Sleeping for " .. i .. " min.")
      os.sleep(60)
    end
  end
end

main()
