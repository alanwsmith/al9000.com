doesSlotHaveTag = function(slot, tag)
  local details = turtle.getItemDetail(slot, true)
  if details then
    for key, val in pairs(details.tags) do
      if key == tag then
        return true
      end
    end
  end
  return false
end
