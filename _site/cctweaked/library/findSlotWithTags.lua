-- Loops through all the slots and returns
-- the first one that has the requested
-- tag. Returns nil if nothing is found

findSlotWithTags = function(tags)
    for slot = 1, 16 do
        local details = turtle.getItemDetail(slot, true)
        if details ~= nil then
            for key, val in pairs(details.tags) do
                for index, tag in ipairs(tags) do
                    if key == tag then
                        turtle.select(slot)
                        return slot
                    end
                end
            end
        end
    end
    return nil
end
