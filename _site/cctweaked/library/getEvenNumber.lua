-- gets an even number.

getEvenNumber = function(prompt)
  while true do
    print(prompt)
    local input = io.read()
    local num_check = input:match "^%s*(.-)%s*$"
    local num = tonumber(num_check)
    -- TODO: Ask again if it's not a number
    if num % 2 == 0 then
      return num
    end
    print("That wasn't an even number. Try again")
  end
end