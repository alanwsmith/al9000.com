require "/_movement"
require "/_placeFloor"
require "/_placeTorchDown"

-- TODO: Check to make sure you
-- have enough blocks and torches

local lightBridgeDown = function()
  print("How Far Down?")
  local distanceDown = tonumber(io.read())
  print("How Far Out?")
  local distanceOut = tonumber(io.read())

  for blockDown = 1, distanceDown do
    down(1)
  end

  for blockOut = 1, distanceOut do
    forward(1)
    placeFloor()
    up(2)
    down(2)
  end
  turnRight()
  turnRight()
  up(1)
  for block = 1, distanceOut do
    forward(1)
    if block % 5 == 0 then
      placeTorchDown()
    end
  end

  for blockDown = 1, distanceDown do
    up(1)
  end
end

lightBridgeDown()

shell.run("menu")
