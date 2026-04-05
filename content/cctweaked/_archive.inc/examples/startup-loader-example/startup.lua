print("Starting startup")

local script_getter = function(url, file_name)
  print("Getting: " .. file_name)
  local response = http.get(url)
  local status = response.getResponseCode()
  if status == 200 then
    print("Got: " .. file_name)
    local output = fs.open(file_name, "w")
    local data = response.readAll()
    output.write(data)
    output.close()
  else
    print("Could not load startup")
  end
end

script_getter(
  "http://aws-minecraft-files.s3-website-us-east-1.amazonaws.com/examples/startup-loader-example/startup.lua",
  "startup.lua"
)

script_getter(
  "http://aws-minecraft-files.s3-website-us-east-1.amazonaws.com/examples/startup-loader-example/main.lua",
  "main.lua"
)

script_getter(
  "http://aws-minecraft-files.s3-website-us-east-1.amazonaws.com/manual-control/left.lua",
  "left.lua"
)

script_getter(
  "http://aws-minecraft-files.s3-website-us-east-1.amazonaws.com/manual-control/right.lua",
  "right.lua"
)

script_getter(
  "http://aws-minecraft-files.s3-website-us-east-1.amazonaws.com/manual-control/forward.lua",
  "forward.lua"
)

script_getter(
  "http://aws-minecraft-files.s3-website-us-east-1.amazonaws.com/manual-control/back.lua",
  "back.lua"
)

print("Startup finished")
