require "/library/doesSlotHaveName"

refuel = function()
  print("Refueling...")
  local fuels = {
    "minecraft:charcoal",
    "minecraft:dried_kelp_block"
  }
  for slot = 1, 16 do
    if turtle.getFuelLevel() < 50000 then
      for index, fuel in ipairs(fuels) do
        if doesSlotHaveName(slot, fuel) then
          turtle.select(slot)
          for get = 1, 64 do
            if turtle.getFuelLevel() < 50000 then
              if turtle.refuel(1) == true then
                print("Adding " .. fuel .. " from slot #" .. slot)
                print("  Fuel Level Now: " .. turtle.getFuelLevel())
              else
                print("No more fuel to add from slot")  
                break
              end
            end
          end
        end
      end
    end
  end
  print("Refuel Complete")
  print("Fuel Level Now: " .. turtle.getFuelLevel())
end
