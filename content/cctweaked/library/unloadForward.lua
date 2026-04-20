-- drops all slots Forward except
-- for charcoal

unloadForward = function() 
  for slot = 1, 16 do
    turtle.select(slot)
    local details = turtle.getItemDetail()
    if details ~= nil then
      if details.name ~= "minecraft:charcoal" then
        turtle.dropForward()
      end
    end
  end
  turtle.select(1)
end

