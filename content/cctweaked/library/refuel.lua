require "/library/_library"

refuel = function()
  print("Refueling...")
  local fuels = {
    "minecraft:charcoal",
  }
  for slot = 1, 16 do
    if turtle.getFuelLevel() < 50000 then
      for index, fuel in ipairs(fuels) do
        if doesSlotHaveName(slot, fuel) then
          print("Adding " .. fuel .. " from slot #" .. slot)
          turtle.select(slot)
          turtle.refuel()
        end
      end
    end
  end
  print("Fuel Level Now: " .. turtle.getFuelLevel())
end
