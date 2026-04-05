require "/_movement"

make_stairs = function(depth)
  for down_level = 1, depth do
    cut_hall(1)
    down(1)
    if down_level % 5 == 0 then
      up(1)
      left()
      forward(1)
      back(1)
      turtle.place()
      right()
      down(1)
    end
  end
  left()
  left()
  up(5)
  for up_level = 1, depth - 5 do
    cut_hall(1)
    up(1)
  end
  forward(5)
  right()
  right()
end

make_stairs(25)
