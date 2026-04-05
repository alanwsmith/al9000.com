require "/_movement"

make_stairs = function(depth)
  for down_level = 1, depth do
    cut_hall(1)
    down(1)
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
