getSlotItemName = function(slot)
  local details = turtle.getItemDetail(slot)
  if details ~= nil then
    return details.name
  else
    return nil
  end
end
