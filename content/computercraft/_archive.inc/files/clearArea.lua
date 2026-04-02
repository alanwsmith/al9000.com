require "/_movement"
require "/_getNumber"

local clearArea = function()
  print("How Long?")
  local y_length = getNumber()
  print("How Wide?")
  local x_width = getNumber()
  print("How Tall?")
  local z_height = getNumber()

  os.sleep(3)

  -- step into area
  forward(1)

  for z = 1, z_height do
    local x = 0
    while x < x_width do
      for y = 1, y_length - 1 do
        forward(1)
      end
      x = x + 1
      if x < x_width then
        if x % 2 == 1 then
          turnRight()
          forward(1)
          turnRight()
        else
          turnLeft()
          forward(1)
          turnLeft()
        end
      end
    end

    if x % 2 == 0 then
      turnRight()
      forward(y_length - 1)
      turnRight()
    else
      turnLeft()
      forward(y_length - 1)
      turnLeft()
    end

    if z < z_height then
      up(1)
    end
  end

  for z = 1, z_height do
    if z < z_height then
      down(1)
    end
  end

  back(1)

  print("Finished Clearning Area")
end

clearArea()
shell.run("menu")
