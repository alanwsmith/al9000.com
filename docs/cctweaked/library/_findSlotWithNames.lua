findSlotWithNames = function(names)
  for slot = 1, 16 do
    local details = turtle.getItemDetail(slot, true)
    if details ~= nil then
      if details.name ~= nil then
        for index, name in ipairs(names) do
          if details.name == name then
            turtle.select(slot)
            return slot
          end
        end
      end
    end
  end
  return nil
end

