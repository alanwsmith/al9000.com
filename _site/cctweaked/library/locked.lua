-- checks to see if the lock file exists.
-- Returns `true` if the file exits
-- and `false` if it's not.

locked = function()
  path = "/local/lock.txt"
  return fs.exists(path)
end