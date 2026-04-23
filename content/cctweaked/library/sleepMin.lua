-- Sleep for the given number
-- of minutes

sleepMin = function(min)
  for i = min, 1, -1 do
    print("Sleeping for " .. i .. "min.")
    os.sleep(60)
  end
end