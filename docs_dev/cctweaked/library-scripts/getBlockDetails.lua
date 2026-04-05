local getBlockDetails = function()
  print("Getting block details")
  local outputFile = fs.open("_block_details.txt", "w")
  outputFile.write("--------------------------\n")
  outputFile.write("Front Block\n")
  outputFile.write("--------------------------\n")

  local has_block, data = turtle.inspect()
  if has_block then
    outputFile.write(textutils.serialise(data))
  else
    outputFile.write("None\n")
  end

  outputFile.write("--------------------------\n")
  outputFile.write("Upper Block\n")
  outputFile.write("--------------------------\n")

  local has_block, data = turtle.inspectUp()
  if has_block then
    outputFile.write(textutils.serialise(data))
  else
    outputFile.write("None\n")
  end

  outputFile.write("--------------------------\n")
  outputFile.write("Lower Block\n")
  outputFile.write("--------------------------\n")

  local has_block, data = turtle.inspectDown()
  if has_block then
    outputFile.write(textutils.serialise(data))
  else
    outputFile.write("None\n")
  end

  outputFile.close()
end

getBlockDetails()
shell.run("edit _block_details.txt")
