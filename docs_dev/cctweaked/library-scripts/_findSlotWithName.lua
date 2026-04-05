-- Loops through all the slots and returns
-- the first one that has the requested
-- name. Returns nil if nothing is found

findSlotWithName = function(name)
  for slot = 1, 16 do
    print("slot: " .. slot)
    local details = turtle.getItemDetail(slot, true)
    if details ~= nil then
      if details.name ~= nil then
        if details.name == name then
          turtle.select(slot)
          return slot
        end
      end
    end
  end
  return nil
end
