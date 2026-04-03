require "/_movement"
require "/_findSlotWithName"

placeTorchDown = function()
  local torchSlot = findSlotWithName("minecraft:torch")
  if torchSlot ~= nil then
    turtle.placeDown()
    print("-- Torch placed")
  else
    print("-- No torch to place")
  end
end
