import fetch from "node-fetch";
import * as dotenv from "dotenv";
dotenv.config();
export const API_URL = "https://platform.vestaboard.com";

const main = async () => {
  const people = { john: [], adri: [] };
  const personList = Object.keys(people);
  const chores = [
    "cat",
    "meals",
    "groceries",
    "pickup",
    "bathrooms",
    "cooking",
    "mow",
    "garden",
    "dishes",
    "vacuum",
    "surfaces",
  ];
  const getRandomItem = (items) =>
    items[Math.floor(Math.random() * items.length)];

  const assignChores = (chores) => {
    const choreWheel = chores.reduce(
      (acc, cur, index) => {
        const chore = getRandomItem(acc.unassignedChores);
        const choresLeft = acc.unassignedChores.filter(
          (item) => item !== chore
        );
        const personList = Object.keys(people);
        const person = personList[index % 2];
        return {
          ...acc,
          [person]: [...acc[person], chore],
          unassignedChores: choresLeft,
        };
      },
      {
        ...people,
        unassignedChores: chores,
      }
    );
    return personList
      .map((person) => `${person}: ${choreWheel[person].join(",")}`)
      .join(`\n`);
  };

  const choreText = assignChores(chores);
  console.log(choreText);
  if (process.env.VB_SUB_KEY) {
    await fetch(`${API_URL}/subscriptions/${process.env.VB_SUB_ID}/message`, {
      method: "POST",
      headers: {
        "X-Vestaboard-Api-Key": process.env.VB_SUB_KEY,
        "X-Vestaboard-Api-Secret": process.env.VB_SUB_SECRET,
      },
      body: JSON.stringify({
        text: choreText,
      }),
    });
  }
};
main();
