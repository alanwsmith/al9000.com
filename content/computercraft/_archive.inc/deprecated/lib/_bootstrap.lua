local download = function(url_path, output_name)
  local domain = "https://raw.githubusercontent.com"
  print("Getting: " .. output_name)
  local response = http.get(domain .. url_path)
  local status = response.getResponseCode()
  if status == 200 then
    local output = fs.open(output_name, "w")
    local data = response.readAll()
    output.write(data)
    output.close()
  else
    print("Could not load: " .. url_path)
  end
end

download("/alanwsmith/minecraft-lua/main/lib/_download.lua", "_download.lua")
download("/alanwsmith/minecraft-lua/main/lib/_library_loader.lua", "_library_loader.lua")
download("/alanwsmith/minecraft-lua/main/menu/menu.lua", "menu.lua")
print("Fuel Level: " .. turtle.getFuelLevel())
