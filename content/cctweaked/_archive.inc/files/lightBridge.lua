require "/_movement"
require "/_placeFloor"
require "/_placeTorchDown"

-- TODO: Check to make sure you
-- have enough blocks and torches

local lightBridge = function()
  print("How Far")
  local distance = tonumber(io.read())
  for block = 1, distance do
    forward(1)
    placeFloor()
    up(2)
    down(2)
  end
  turnRight()
  turnRight()
  up(1)
  for block = 1, distance do
    forward(1)
    if block % 5 == 0 then
      placeTorchDown()
    end
  end
end

lightBridge()

print("Completed: lightBridge")
shell.run("menu")
