print("Running startup.lua")

downloadFile = function(fileName)
  print("Getting: " .. fileName)
  local domain = "https://al9000.com"
  local url = domain .. "/computercraft/local-scripts/" .. fileName
  local response = http.get(url)
  if response then
    local status = response.getResponseCode()
    if status == 200 then
      local output = fs.open(fileName, "w")
      local data = response.readAll()
      output.write(data)
      output.close()
    else
      print("Non 200 response for: " .. fileName)
    end
  else
    print("Unknown error for: " .. fileName)
  end
end

downloadFile("menu.lua")
shell.run("menu")

