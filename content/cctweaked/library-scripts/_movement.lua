back = function(steps)
  turtle.turnRight()
  turtle.turnRight()
  for step = 1, steps do
    print("-- Move back - Remaining Fuel: " .. turtle.getFuelLevel())
    while turtle.detect() do
      turtle.dig()
    end
    turtle.forward()
  end
  turtle.turnLeft()
  turtle.turnLeft()
end

down = function(steps)
  -- TODO: Watch out for bedrock with this
  for step = 1, steps do
    print("-- Move down - Remaining Fuel: " .. turtle.getFuelLevel())
    while turtle.detectDown() do
      turtle.digDown()
    end
    turtle.down()
  end
end

forward = function(steps)
  for step = 1, steps do
    print("-- Move forward - Remaining Fuel: " .. turtle.getFuelLevel())
    while turtle.detect() do
      turtle.dig()
    end
    turtle.forward()
  end
end

turnLeft = function()
  print("-- Turning Left - Remaining Fuel: " .. turtle.getFuelLevel())
  turtle.turnLeft()
end

turnRight = function()
  print("-- Turning Right - Remaining Fuel: " .. turtle.getFuelLevel())
  turtle.turnRight()
end

up = function(steps)
  for step = 1, steps do
    print("-- Move up - Remaining Fuel: " .. turtle.getFuelLevel())
    while turtle.detectUp() do
      turtle.digUp()
    end
    turtle.up()
  end
end

digDown = function()
  -- note: this doesn't keep trying
  -- in case it hits bedrock, not sure
  -- what cases there are where it
  -- would need to regardless
  print("-- Digging down - Remaining Fuel: " .. turtle.getFuelLevel())
  turtle.digDown()
end

digUp = function()
  print("-- Digging up - Remaining Fuel: " .. turtle.getFuelLevel())
  while turtle.detectUp() do
    turtle.digUp()
  end
end
