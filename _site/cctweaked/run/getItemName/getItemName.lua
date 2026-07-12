local getItemName = function()
  local details = turtle.getItemDetail(1)
  if details ~= nil then
    print(details.name)
  else
    print("Nothing in slot 1")
  end
end

getItemName()
