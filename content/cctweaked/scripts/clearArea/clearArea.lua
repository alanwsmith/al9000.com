require "/library/_library"

local clearArea = function(y_length, x_width, z_height)
  print("clearArea initiated")

  os.sleep(3)

  -- step into area
  forward(1)

  for z = 1, z_height do
    local x = 0
    while x < x_width do
      for y = 1, y_length - 1 do
        if z == 2 then
          if x % 8 == 4 then
            if y % 8 == 4 then
              placeTorchDown()
            end
          end
        end

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

local getCoords = function() 
  print("How Long?")
  local y_length = getNumber()
  print("How Wide?")
  local x_width = getNumber()
  print("How Tall?")
  local z_height = getNumber()
  if y_length % 2 == 0 then
    if x_width % 2 == 0 then
      clearArea(y_length, x_width, z_height)
    else
      print("Width must be an even number")
    end
  else 
    print("Height must be an even number")
  end
end

getCoords()