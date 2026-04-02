require "/_movement"

local makePath = function(length)
  for step = 1, length do
    if turtle.detectDown() ~= nil then
      turtle.placeDown()
    end
    forward(1)
  end
  back(length)
end

print("How far should I go")
local steps_to_go = tonumber(io.read())
makePath(steps_to_go)
