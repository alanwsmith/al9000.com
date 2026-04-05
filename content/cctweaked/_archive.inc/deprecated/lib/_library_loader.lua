require "/_download"

-- load self for next time
download("/lib/_library_loader.lua", "_library_loader.lua")

-- get the stuff
-- download("/lib/_cut_chunk.lua", "_cut_chunk.lua")
download("/lib/_doesBlockHaveTag.lua", "_doesBlockHaveTag.lua")
download("/lib/_doesSlotHaveTag.lua", "_doesSlotHaveTag.lua")
download("/lib/_findSlotWithName.lua", "_findSlotWithName.lua")
download("/lib/_findSlotWithTag.lua", "_findSlotWithTag.lua")
download("/lib/_getSlotItemName.lua", "_getSlotItemName.lua")
download("/lib/_movement.lua", "_movement.lua")
download("/menu/menu.lua", "menu.lua")
download("/move/left.lua", "left.lua")
download("/move/right.lua", "right.lua")
download("/move/up.lua", "up.lua")
download("/move/down.lua", "down.lua")
download("/move/forward.lua", "forward.lua")
download("/move/back.lua", "back.lua")
download("/processes/clearChunk/clearChunk.lua", "clearChunk.lua")
download("/processes/cutHall/cutHall.lua", "cutHall.lua")
download("/processes/getAllSlotDetails/getAllSlotDetails.lua", "getAllSlotDetails.lua")
download("/processes/harvest-trees/harvest-trees.lua", "harvest-trees.lua")
download("/processes/makeStairs/makeStairs.lua", "makeStairs.lua")
download("/processes/makePath/makePath.lua", "makePath.lua")
download("/processes/renameTurtle/renameTurtle.lua", "renameTurtle.lua")
