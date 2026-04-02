require "/_movement"

local commands = {
  "getAllSlotDetails",
  "getBlockDetails",
  "refuelTurtle",
  "renameTurtle"
}

for k, v in ipairs(commands) do
  print(k .. " - " .. v)
end

local id = io.read()

if id ~= "" then
  local indexNum = tonumber(id)
  local command = commands[indexNum]
  if command then
    local domainFile = fs.open("_domain.txt", "r")
    local domain = domainFile.readLine()
    domainFile.close()
    shell.run("wget run " .. domain .. "/longplay_files/" .. command .. ".lua")
    print("")
  elseif id == "u" then
    up(1)
    shell.run("menu")
  elseif id == "d" then
    down(1)
    shell.run("menu")
  elseif id == "l" then
    turnLeft()
    shell.run("menu")
  elseif id == "r" then
    turnRight()
    shell.run("menu")
  elseif id == "f" then
    forward(1)
    shell.run("menu")
  elseif id == "b" then
    back(1)
    shell.run("menu")
  elseif id == "t" then
    shell.run("menu")
  else
    print("---------------------")
    print("Not a valid command")
    shell.run("menu")
  end
end
