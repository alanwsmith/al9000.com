require "/_movement"

cut_hall = function(steps)
  while turtle.detectUp() do
    turtle.digUp()
  end
  while turtle.detectDown() do
    turtle.digDown()
  end
  for step = 1, steps do
    print("-- Move forward: " .. step)
    while turtle.detect() do
      turtle.dig()
    end
    turtle.forward()
    while turtle.detectUp() do
      turtle.digUp()
    end
    turtle.digDown()
    if step % 6 == 0 then
      left()
      forward(1)
      back(1)
      turtle.place()
      right()
    end
  end
  left()
  left()
  forward(steps)
  left()
  left()
end

print("How far should I go")
local steps_to_go = tonumber(io.read())
cut_hall(steps_to_go)
