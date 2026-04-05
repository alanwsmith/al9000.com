require "/_movement"
require "/_placeTorch"
require "/_findSlotWithTag"
require "/_findSlotWithNames"

-- TODO: [] Look for bedrock to stop
-- TODO: [] Place stairs back up
-- TODO: [] Plug lava
-- TODO: [x] Place base step blocks if they're not there

local placeStair = function()
  local slot = findSlotWithTag("minecraft:stairs")
  if slot then
    turtle.placeDown()
  end
end

makeSureThereIsFloor = function()
  local has_block, data = turtle.inspectDown()
  if has_block == false then
    print("missing floor")
    down(1)
    makeSureThereIsFloor()
    up(1)
    local slot = findSlotWithNames({
      "minecraft:cobbled_deepslate",
      "minecraft:cobblestone",
      "minecraft:dirt",
      "minecraft:grass_block",
      "minecraft:stone",
      "minecraft:tuff",
    })
    if slot then
      turtle.placeDown()
    end
  end
end

local makeStairsToBedrock = function()
  local height = 6
  -- NOTE: This goes 2x the stepsDown
  -- because of the way it's setup
  local stepsDown = 60
  -- Going Down
  for stair = 1, stepsDown do
    forward(1)
    down(1)
    makeSureThereIsFloor()
    up(height)
    turnLeft()
    forward(1)
    down(height)
    makeSureThereIsFloor()
    turnRight()
    forward(1)
    down(1)
    makeSureThereIsFloor()
    up(height)
    turnRight()
    forward(1)
    down(height)
    makeSureThereIsFloor()
    if stair % 2 == 0 then
      up(3)
      placeTorch()
      down(3)
    end
    turnLeft()
  end

  -- come back
  turnRight()
  turnRight()
  up(1)
  local stepsUp = stepsDown * 2
  for stair = 1, stepsUp do
    placeStair()
    turnRight()
    forward(1)
    turnLeft()
    placeStair()
    turnLeft()
    forward(1)
    turnRight()
    up(1)
    forward(1)
  end
  forward(1)
  turnLeft()
  turnLeft()
end

makeStairsToBedrock()

print("Completed: makeStairsToBedrock")
shell.run("menu")
