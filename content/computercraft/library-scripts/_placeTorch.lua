require "/_movement"
require "/_findSlotWithName"

placeTorch = function()
  local torchSlot = findSlotWithName("minecraft:torch")
  if torchSlot ~= nil then
    forward(1)
    back(1)
    turtle.place()
    print("-- Torch placed")
  else
    print("-- No torch available")
  end
end
