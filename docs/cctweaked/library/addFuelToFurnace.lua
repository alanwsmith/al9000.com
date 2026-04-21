-- NOTE:
-- Adding fuel via the peripheral interface
-- requires using a chest in addition to
-- the furnace since items can't be pushed
-- to specific slots from the turtle itself.

-- NOTE:
-- To add fuel directly from the turtle use
-- `turtle.drop()` while pointing to the 
-- furnace from beside it. (`turtle.dropDown()`
-- from above adds items to smelt.
-- TBD if `turtle.getUp()` gets the
-- smelted output items.)

-- NOTE:
-- This code assumes the turtle is
-- above/below/beside both a furnace
-- and a chest with fuel in it. 

-- NOTE:
-- Slot 1: item to cook
-- Slot 2: fuel
-- Slot 3: cooked item

-- REFERENCES:
-- https://tweaked.cc/module/peripheral.html
-- https://tweaked.cc/generic_peripheral/inventory.html#v:pushItems

-- TODO List:
-- [x] Handle if there's no fuel in the 
-- furnace to start with
--
-- [] Handle lava bucket


local addFuelToFurnace = function()
  print("Adding fuel to furnace")
  local furnaceFuelSlotNum = 2
  local fuelNames = {
    "minecraft:charcoal",
    "minecraft:dried_kelp_block"
  }
  local chest = peripheral.find("minecraft:chest")
  local furnace = peripheral.find("minecraft:furnace")

  -- And an initial item if the furnace is empty
  local fuelCheck = furnace.getItemDetail(furnaceFuelSlotNum)
  if fuelCheck == nil then
    print("Furnace is empty.")
    for slot, item in pairs(chest.list()) do
      for _, fuelName in ipairs(fuelNames) do
        if item.name == fuelName then
          print("Adding " .. item.name .. " for fuel type")
          chest.pushItems(peripheral.getName(furnace), slot, 1, furnaceFuelSlotNum)
          goto addedFirstItem
        end
      end
    end
  end
  ::addedFirstItem::

  -- Add more until the furnace if full 
  -- or you run out. 
  for slot, item in pairs(chest.list()) do
    local fuel = furnace.getItemDetail(furnaceFuelSlotNum)
    if fuel and fuel.name == item.name then
      for count = 1, item.count do
        if fuel.count + count <= fuel.maxCount then
          chest.pushItems(peripheral.getName(furnace), slot, 1, furnaceFuelSlotNum)
          print("Added: " .. item.name)
        else
          print("Already at max fuel")
          break
        end
      end
    end
  end

  print("Finished adding fuel to furnace")
end

addFuelToFurnace()
