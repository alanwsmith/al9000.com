require "/library/scripts"

local main = function()
  settings.set("motd.enable", false)
  settings.save()
  local script = "/run/HelloWorld.lua"
  local lockFile = "/local/lock.txt"
  if fs.exists(lockFile) then
    print("Lock file exists at: " .. lockFile)
    print("Startup script halted.")
    return nil
  end
  print("Preparing to run:")
  print(script)
  -- REMINDER: Always sleep otherwise
  -- the tutrle will kick off if you
  -- break it and re-place it.
  sleepMin(1)
  shell.execute(script)
end

main()

