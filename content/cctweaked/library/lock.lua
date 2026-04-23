-- create a /local/lock.txt file desinged 
-- to be used at startup to determine
-- if a computer/turtle was stopped
-- while a program was actively running. 


lock = function()
  path = "/local/lock.txt"
  local output = fs.open(path, "w")
  output.write("A process was started that has not unlocked yet")
  output.close()
  print("Added lock file")
end

