export const b = { init: "cards" };

let json;

export async function cards() {
  json = await b.getData("example.json");
  if (json) {
    json.ObjectStates.forEach((objectState, objectStateIndex) => {
      console.log(objectState);
      if (objectState.ContainedObjects) {
        objectState.ContainedObjects.forEach((obj, objIndex) => {
          const smallID = `${obj.CardID}`.replaceAll(/00$/g, "");
          console.log(obj);
          console.log(smallID);
          console.log(obj.CardID);
          console.log(objectState.CustomDeck[smallID]);
        });
      }
    });
  }
}
