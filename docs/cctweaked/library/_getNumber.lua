getNumber = function()
  local input = io.read()
  local num_check = input:match "^%s*(.-)%s*$"
  return tonumber(num_check)
end
