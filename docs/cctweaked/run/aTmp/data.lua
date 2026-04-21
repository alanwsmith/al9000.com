local has_block, data = turtle.inspectDown()
if has_block then
  print(textutils.serialise(data))
else
  print("nothing below")
end