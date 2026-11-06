function isEven(n: number): boolean {
  return n % 2 === 0;
}

function countWords(text: string | null | undefined): number {
  const trimmedText = text?.trim() ?? "";
  return trimmedText === "" ? 0 : trimmedText.split(/\s+/).length;
}

interface Project {
  name: string;
  language: string;
  stars: number;
}

const projects: Project[] = [
  { name: "TypeScript", language: "TypeScript", stars: 70000 },
  { name: "React", language: "JavaScript", stars: 180000 },
];

type Status = "loading" | "success" | "error";
function describe(status: Status): string {
  switch (status) {
    case "loading":
      return "Loading...";
    case "success":
      return "Operation completed successfully.";
    case "error":
      return "An error occurred.";
  }
}

describe("loading");
describe("success");
describe("error");
// describe("done");

interface GitHubRepo {
  name: string;
  html_url: string;
  description: string | null;
}

async function getRepos(user: string): Promise<GitHubRepo[]> {
  const response = await fetch(`https://api.github.com/users/${user}/repos`);
  if (response.ok) {
    const data: GitHubRepo[] = await response.json();
    return data;
  }
  throw new Error("Failed to fetch repositories");
}

function firstItem<T>(items: T[]): T | undefined {
  return items[0];
}

console.log(firstItem([1, 2, 3]));
console.log(firstItem(["a", "b", "c"]));
console.log(firstItem([]));

console.log(isEven(4));
console.log(isEven(7));

console.log(countWords("hello world"));
console.log(countWords("   "));

console.log(projects.filter((project) => project.stars > 100000));