const people = { john: [], adrienne: [] };
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
      const choresLeft = acc.unassignedChores.filter((item) => item !== chore);
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
    .map((person) => `${person}: ${choreWheel[person].join(", ")}`)
    .join(`\n\n`);
};
console.log(process.env.TEST_ENV);
console.log(assignChores(chores));
