require "/_download"
require "/_library_loader"

download("/processes/hole-digger/main.lua", "main.lua")
shell.execute("main.lua")
