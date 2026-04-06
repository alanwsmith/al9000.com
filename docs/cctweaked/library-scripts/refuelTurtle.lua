require "/_doesSlotHaveName"

local refuelTurtle = function()
  local fuels = {
    "minecraft:charcoal",
  }
  for slot = 1, 16 do
    for index, fuel in ipairs(fuels) do
      if doesSlotHaveName(slot, fuel) then
        print("Adding " .. fuel .. " from slot #" .. slot)
        turtle.refuel()
      end
    end
  end
end

print("----------------------")
print("Refueling")
refuelTurtle()
print("Fuel Level Now: " .. turtle.getFuelLevel())
print("----------------------")
print("Press any key to return to the menu")
io.read()
shell.run("menu")
