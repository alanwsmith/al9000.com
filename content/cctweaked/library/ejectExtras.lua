-- Loop through all slots and only
-- keep one stack of each kind of thing.
--
-- Compact the slots before and after each
-- run so that empty slots don't get filled
-- before partially filled ones with the
-- same item type. 


local combineItems = function()
  for startSlot = 1, 16 do
    for endSlot = startSlot + 1, 16 do
      local startData = turtle.getItemDetail(startSlot)
      local endData = turtle.getItemDetail(endSlot)
      if startData ~= nil and endData ~= nil then
        if startData.name == endData.name then
          turtle.select(endSlot)
          turtle.transferTo(startSlot)
        end
      end
    end
  end
end

local compactSlots = function()
  for slot = 1, 16 do
    local data = turtle.getItemDetail(slot)
    if data == nil then
      for payloadSlot=16,1,-1 do
        if payloadSlot > slot then
          local payloadData = turtle.getItemDetail(payloadSlot)
          if payloadData ~= nil then
            turtle.select(payloadSlot)
            turtle.transferTo(slot)
            -- print(slot .. " " .. payloadSlot)
          end
        end
      end
    end
  end
end

ejectExtras = function(name)
  combineItems()
  compactSlots()
  local seen = {}
  for slot = 1, 16 do
    local details = turtle.getItemDetail(slot)
    if details ~= nil then
      if details.name ~= nil then
        if seen[details.name] then
          print("ejecting " .. details.name)
          turtle.select(slot)
          turtle.dropDown()
        else
          seen[details.name] = true
          -- print("found " .. details.name)
        end
      end
    end
  end
  combineItems()
  compactSlots()
  turtle.select(1)
end
