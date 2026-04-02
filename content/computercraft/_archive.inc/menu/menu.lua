require "/_library_loader"

-- turtle.refuel()

local fuel = turtle.getFuelLevel()

if fuel > 100 then
  print("Choose a program (Fuel: " .. turtle.getFuelLevel() .. ")")

  print("1 - Harvest Trees")
  print("2 - Make Stairs")
  print("3 - Clear Chunk")
  print("4 - Cut Hall")
  print("5 - Make Path")
  print("6 - Rename Turtle")

  local id = io.read()

  if id == "1" then
    shell.execute("harvest-trees")
  elseif id == "2" then
    shell.execute("makeStairs")
  elseif id == "3" then
    shell.execute("clearChunk")
  elseif id == "4" then
    shell.execute("cutHall")
  elseif id == "5" then
    shell.execute("makePath")
  elseif id == "6" then
    shell.execute("renameTurtle")
  else
    print("No match")
  end
else
  print("Needs refuel (less than 100)")
end
