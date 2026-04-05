require "/_download"
require "/_library_loader"

download("/processes/tree-harvester/main.lua", "main.lua")
shell.execute("main.lua")
