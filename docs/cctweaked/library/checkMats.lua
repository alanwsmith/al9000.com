-- Checks to see if there
-- are enough blocks in the
-- turtle of a given type. 

-- Returns `true` if there is.
-- Returns `false` otherwise.

-- First argument is the
-- block type to look for. 

-- Second argument is
-- the base number to look for.

-- If an optional third
-- argument is sent it's 
-- multiplied to the first
-- number (i.e. the second
-- argument)


checkMats = function(blockName, x, y)
  y = y or 1
  target = x * y
  print("Need " .. target .. "x " .. blockName)
  found = 0
  for slotNum = 1, 16 do
    local slot = turtle.getItemDetail(slotNum)
    if slot then
      if slot.name == blockName then
        found = found + slot.count
      end
    end
  end
  if found >= target then
    print("Found Enough (" .. found .. ")")
    return true
  else
    print("Not Enough. Only Found " .. found .. "x")
    return false
  end
end
