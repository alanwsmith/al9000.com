doesSlotHaveName = function(slot, name)
  local details = turtle.getItemDetail(slot, true)
  if details then
    if details.name == name then
      return true
    end
  end
  return false
end
