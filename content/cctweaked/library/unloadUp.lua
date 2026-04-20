-- drops all slots Up except
-- for charcoal

unloadUp = function() 
  for slot = 1, 16 do
    turtle.select(slot)
    local details = turtle.getItemDetail()
    if details ~= nil then
      if details.name ~= "minecraft:charcoal" then
        turtle.dropUp()
      end
    end
  end
  turtle.select(1)
end

