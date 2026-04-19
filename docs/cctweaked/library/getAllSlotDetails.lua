getAllSlotDetails = function()
  local out = fs.open("item_details.txt", "w")
  out.write("Item Details")
  for slot = 1, 16 do
    out.write("------------------------------\n")
    out.write("Slot: " .. slot .. "\n")
    local detail = turtle.getItemDetail(slot, true)
    if detail then
      out.write(textutils.serialise(detail))
      out.write("\n")
    else
      out.write("No item\n\n")
    end
  end
  out.close()
end

getAllSlotDetails()

shell.run("edit item_details.txt")
