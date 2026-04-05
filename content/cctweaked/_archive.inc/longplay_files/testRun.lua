require "/_getNumber"
-- require "/_movement"

-- require "/_findSlotWithNames"

-- turnLeft()
-- forward(3)
-- turnLeft()
-- forward(1)
-- turnRight()
-- turnRight()


print("input somehting to trim")
local in_data = getNumber()

print("Results")
print("---" .. in_data .. "---")
print("---" .. in_data:match "^%s*(.-)%s*$" .. "---")

io.read()

-- turtle.place()


-- local slot = findSlotWithNames({
--   "minecraft:cobblestone",
--   "minecraft:cobbled_deepslate",
--   "minecraft:dirt",
--   "minecraft:grass_block",
--   "minecraft:stone",
--   "minecraft:tuff",
-- })
-- print(slot)

shell.run("menu")
