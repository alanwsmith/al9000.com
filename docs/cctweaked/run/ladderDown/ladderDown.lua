require "/library/isBedrock"
require "/library/findSlotWithTag"
require "/library/findSlotWithName"
require "/library/movement"


local placeLadders = function(depth) 
  for i=depth,0,-1 do
    local itemSlot = findSlotWithName("minecraft:ladder")
    if itemSlot ~= nil then
      turtle.place()
    end
    up(1)
  end
end

local digHole = function()
  local depthCount = 0
  local maxDepth = 300
  for i=1,maxDepth,1 do
    while turtle.detect() do
      turtle.dig()
    end
    -- choose either cobblestones or stones based on
    -- what you have.
    -- local blockSlot = findSlotWithTag("c:cobblestones")
    local blockSlot = findSlotWithTag("c:stones")
    if blockSlot == nil then
      print("No cobblestone to place")
      break
    else
      turtle.place()
    end
    if isBedrock() == true then     
      print("hit bedrock")
      break
    else
      print("digging")
      down(1)
      depthCount = depthCount + 1
    end
  end
  back(1)
  -- this `up(1)` is here to avoid the 
  -- second layer of bedrock. 
  -- TODO: Handle this better so that
  -- the lowest rung of the ladder 
  -- is placed. 
  up(1)
  placeLadders(depthCount)
end

digHole()



      -- local itemSlot = findSlotWithName("minecraft:ladder")
      -- if itemSlot ~= nil then
      --   turtle.place()
      -- end