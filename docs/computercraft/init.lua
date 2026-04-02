-- Run this file from a minecraft computer with:
-- wget run https://al9000.com/computercraft/init.lua
print("Initalizing: Downloading startup.lua")
local domain = "https://al9000.com"
local path = "/computercraft/local-scripts/startup.lua"
local response = http.get(domain .. path)
local output = fs.open("startup.lua", "w")
output.write(response.readAll())
output.close()
os.reboot()


