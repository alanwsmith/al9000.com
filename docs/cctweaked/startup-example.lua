require "/library/scripts"

settings.set("motd.enable", false)

local main = function()
  print("Initializing with: startup.lua")
  local script = "/run/SugerCaseHarvest.lua"
  local lockFile = "/local/lock.txt"
  if fs.exists(lockFile) then
    print("Lock file exists at: " .. lockFile)
    print("Startup script halted.")
    return nil
  end
  print("No lock file found.")
  print("Running" .. script .. "in two min.")
  sleepMin(1)
end

main()

