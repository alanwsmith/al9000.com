local steps = ...

goForward = function(steps)
    for step = 1, steps do
      while turtle.detect() do
        turtle.dig()
      end
      turtle.forward()
      os.setComputerLabel("F: " .. turtle.getFuelLevel())
    end
end


main = function()
    if steps == nil then
        goForward(1)
    else
        goForward(steps)
    end
end

main()