-- remove the lock file to indiciate that
-- a computer/turtle is in a state where
-- it's startup.lua can be used to 
-- run it's main process. 

unlock = function()
  path = "/local/lock.txt"
  if fs.exists(path) then
    fs.delete(path)
    print("Removed lock file")
  end
end