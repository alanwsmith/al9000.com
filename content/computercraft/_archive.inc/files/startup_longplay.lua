print("Running bootstrap")

downloadFile = function(fileName)
  print("Getting: " .. fileName)
  local domainFile = fs.open("_domain.txt", "r")
  local domain = domainFile.readLine()
  domainFile.close()
  local url = domain .. "/files/" .. fileName
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

downloadFile("_doesBlockHaveTag.lua")
downloadFile("_doesSlotHaveName.lua")
downloadFile("_doesSlotHaveTag.lua")
downloadFile("_findSlotWithName.lua")
downloadFile("_findSlotWithNames.lua")
downloadFile("_findSlotWithTag.lua")
downloadFile("_findSlotWithTags.lua")
downloadFile("_getNumber.lua")
downloadFile("_getSlotItemName.lua")
downloadFile("_movement.lua")
downloadFile("_placeFloor.lua")
downloadFile("_placeTorch.lua")
downloadFile("_placeTorchDown.lua")
downloadFile("back.lua")
downloadFile("down.lua")
downloadFile("forward.lua")
downloadFile("getAllSlotDetails.lua")
downloadFile("longplay_menu.lua")
downloadFile("renameTurtle.lua")
downloadFile("startup_longplay.lua")
downloadFile("turnLeft.lua")
downloadFile("turnRight.lua")
downloadFile("up.lua")

shell.run("longplay_menu")
