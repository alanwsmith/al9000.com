-- Assumes there is a furnace in front
-- of the turtle

-- Slot 1: item to cook
-- Slot 2: fuel
-- Slot 3: cooked item


local addFuelToFurnace = function()
  print("Adding fuel")
  local furnace = peripheral.wrap("front")
  for slot, item in pairs(furnace.list()) do
    print(("%d x %s in slot %d"):format(item.count, item.name, slot))
  end
end


addFuelToFurnace()

