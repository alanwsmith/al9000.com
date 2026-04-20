require "/library/movement"
require "/library/findSlotWithName"
require "/library/findSlotWithNames"

local selectStair = function() 
  local names = {
    "minecraft:birch_stairs"
  }
  return findSlotWithNames(names)
end

local makeStairs = function()
  local cavernHeight = 4
  for i = 1, 7, 1 do
    if selectStair() == nil then
      print("No stairs available")
      break
    end
    down()
    forward()
    turnLeft(2)
    turtle.place()
    turnRight(2)
    for raise = 1, cavernHeight do
      up()
      turtle.dig()
    end
    if i % 5 == 0 then
      if findSlotWithName("minecraft:torch") ~= nil then
        turtle.place()
      end
    end
    down(cavernHeight)
  end
end

forward()
makeStairs()
