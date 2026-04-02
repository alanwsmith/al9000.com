local move_forward = function(steps)
  for step = 1, steps do
    print("Forward: " .. step)
    turtle.digUp()
    turtle.digDown()
    while turtle.detect() do
      turtle.dig()
    end
    turtle.forward()
  end
end

local move_backwards = function(steps)
  turtle.turnRight()
  turtle.turnRight()
  for step = 1, steps do
    print("Backwards: " .. step)
    while turtle.detect() do
      turtle.dig()
    end
    turtle.forward()
  end
  turtle.turnLeft()
  turtle.turnLeft()
end

local fuel = turtle.getFuelLevel()

print(fuel)

turtle.refuel()
move_forward(48)
move_backwards(48)
