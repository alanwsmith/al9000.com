-- Checks fuel level to make sure
-- there is enough. 

-- Defaults to 500

-- Can optionoally adjust 
-- required level.

-- Can also refuel by passing
-- true to optional second argument. 

require "/library/refuel"

checkFuelLevel = function(target, doRefuel)
  target = target or 500
  doRefuel = doRefuel or false
  sleepMin = 2
  while true do
    if doRefuel == true then
      refuel()
    end
    if turtle.getFuelLevel() < target then
      print("Not enough fuel: " .. turtle.getFuelLevel() .. "/" .. target)
      for i = sleepMin, 1, -1 do
        print("Sleeping for " .. i .. " min.")
        os.sleep(60)
      end
    else
      print("Found enough fuel: " .. turtle.getFuelLevel() .. "/" .. target)
      return true
    end
  end
end