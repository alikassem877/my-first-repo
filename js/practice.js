// 1. Concise isEven function
const isEven = (n) => n % 2 === 0;

console.log(isEven(4)); // true
console.log(isEven(7)); // false

// 2. Projects filtering using modern array methods and optional chaining/destructuring
const projects = [
  { name: "Project 1", language: "JavaScript", stars: 5 },
  { name: "Project 2", language: "Python", stars: 10 },
  { name: "Project 3", language: "Java", stars: 15 },
  { name: "Project 4", language: "C++", stars: 20 },
];

const filteredProjects = projects
  .filter(({ stars }) => stars > 10)
  .map(({ name }) => name);

console.log(filteredProjects); // [ 'Project 3', 'Project 4' ]

// 3. Fixed word counter function with correct scoping
const countWords = (text) => {
  const trimmedText = text?.trim() ?? "";

  if (trimmedText === "") return 0;

  return trimmedText.split(/\s+/).length;
};

console.log(countWords("  hello   world  "));
console.log(countWords(""));

// 4. Clean FizzBuzz loop (1 to 30)
for (let i = 1; i <= 30; i++) {
  const output = `${i % 3 === 0 ? "Fizz" : ""}${i % 5 === 0 ? "Buzz" : ""}`;
  console.log(output || i);
}