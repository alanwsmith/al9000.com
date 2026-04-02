local steps = ...

goBack = function(steps)
    turtle.turnRight()
    turtle.turnRight()
    for step = 1, steps do
      while turtle.detect() do
        turtle.dig()
      end
      turtle.forward()
      os.setComputerLabel("F: " .. turtle.getFuelLevel())
    end
    turtle.turnLeft()
    turtle.turnLeft()
end

main = function()
    if steps == nil then
        goBack(1)
    else
        goBack(steps)
    end
end

main()

