isBedrock = function() 
  local has_block, data = turtle.inspectDown()
  if has_block then
    if data.name == "minecraft:bedrock" then
      return true
    else
      return false
    end
  else
    return false
  end
end