local domain = "http://aws-minecraft-files.s3-website-us-east-1.amazonaws.com"
local path = "/lib/_bootstrap.lua"
local response = http.get(domain .. path)
local output = fs.open("startup.lua", "w")
output.write(response.readAll())
output.close()
os.reboot()
