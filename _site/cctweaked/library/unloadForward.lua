-- drops all slots Forward except
-- for dried_kelp_block

-- TODO: Create a list of fuels that 
-- don't get dropped. 

unloadForward = function() 
  for slot = 1, 16 do
    turtle.select(slot)
    local details = turtle.getItemDetail()
    if details ~= nil then
      if details.name ~= "minecraft:dried_kelp_block" then
        turtle.drop()
      end
    end
  end
  turtle.select(1)
end

