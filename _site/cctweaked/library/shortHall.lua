-- Carves a hallway.

-- Start the bot at
-- head height. It digs
-- down one at each step.

-- Defaults to one
-- step. 

-- Can set an optinal
-- number of steps. 

-- Attempts to place
-- a touch every 8 steps
-- if there's one available.


require "/library/movement"
require "/library/placeTorchDown"

shortHall = function(steps)
  steps = steps or 1
  for step = 1, steps do
    turtle.digDown()
    if step % 8 == 0 then
      placeTorchDown()
    end
    forward(1)
  end
end