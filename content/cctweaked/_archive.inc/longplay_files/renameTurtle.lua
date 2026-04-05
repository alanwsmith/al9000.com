local renameTurtle = function()
  print("What would you like the name to be")
  local newName = io.read()
  os.setComputerLabel(newName)
  print("Name changed.")
end

renameTurtle()

shell.run("menu")
