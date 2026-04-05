print("Loading Tree Harvester")
require "/_download"
download("/processes/tree-harvester/main.lua", "main.lua")
download("/processes/tree-harvester/run.lua", "run.lua")
download("/processes/tree-harvester/startup.lua", "startup.lua")
print("Tree Harvester Ready")
print("Fuel: " .. turtle.getFuelLevel())
