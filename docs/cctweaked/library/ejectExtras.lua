-- TODO: Loop through all slots and only
-- keep one stack of each kind of thing.

ejectExtras = function(name)
  local seen = {}
  for slot = 1, 16 do
    local details = turtle.getItemDetail(slot, true)
    if details ~= nil then
      if details.name ~= nil then
        if seen[details.name] then
          print("ejecting " .. details.name)
          turtle.select(slot)
          turtle.dropDown()
        else
          seen[details.name] = true
          print("found " .. details.name)
        end
      end
    end
  end
end

-- For dev
ejectExtras()
