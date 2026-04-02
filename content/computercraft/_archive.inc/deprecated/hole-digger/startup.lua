print("Loading Hold Digger")
require "/_download"
download("/processes/hole-digger/main.lua", "main.lua")
download("/processes/hole-digger/run.lua", "run.lua")
download("/processes/hole-digger/startup.lua", "startup.lua")
print("Hole Digger Ready")
print("Fuel: " .. turtle.getFuelLevel())
