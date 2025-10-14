export const meta = {
  id: "day-05-js",
  title: "Group By Property",
  prompt: "Group an array of objects by one property.",
};

type Person = {
  name: string;
  team: string;
};

export function groupByTeam(people: Person[]) {
  return people.reduce<Record<string, string[]>>((groups, person) => {
    groups[person.team] = groups[person.team] ?? [];
    groups[person.team].push(person.name);
    return groups;
  }, {});
}

export function run() {
  const people = [
    { name: "Asha", team: "frontend" },
    { name: "Dev", team: "backend" },
    { name: "Mira", team: "frontend" },
  ];

  return [`Input: ${JSON.stringify(people)}`, `Output: ${JSON.stringify(groupByTeam(people))}`].join(
    "\n",
  );
}
