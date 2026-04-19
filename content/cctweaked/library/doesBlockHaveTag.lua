-- Checks to see if the block in front
-- of the turtle has a given tag

doesBlockHaveTag = function(tag)
  local has_block, details = turtle.inspect()
  if has_block then
    for key, _ in pairs(details.tags) do
      if key == tag then
        return true
      end
    end
    return false
  else
    return false
  end
end
