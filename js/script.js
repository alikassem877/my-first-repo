
// 1. Theme Toggle & Persistence

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
}

const themeToggle = document.querySelector("#theme-toggle");

function updateThemeButton() {
  const isDark = document.body.classList.contains("dark-mode");

  themeToggle.textContent = isDark ? "☀️" : "🌙";
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

if (themeToggle) {
  updateThemeButton();

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    localStorage.setItem("theme", isDark ? "dark" : "light");

    updateThemeButton();
  });
}


// 2. Featured Projects

const projects = [
  {
    name: "Dealer Management SaaS",
    description:
      "A multi-tenant dealership management platform featuring vehicle inventory, customer management, sales operations, authentication, and subscription management. Built with Next.js, TypeScript, Prisma, and PostgreSQL.",
  },
  {
    name: "Baytak Care",
    description:
      "A team-built remote property monitoring platform. Contributed backend functionality, database schemas, role-based access controls, maintenance workflows, and secure caretaker invitations using Next.js, TypeScript, PostgreSQL, and Prisma.",
  },
];

const projectsGrid = document.querySelector("#featured-projects");

function createProjectCard(name, description, link = null) {
  const article = document.createElement("article");
  article.className = "project-card";

  const heading = document.createElement("h3");
  heading.textContent = name;

  const paragraph = document.createElement("p");
  paragraph.textContent = description;

  article.append(heading, paragraph);

  // Add a repository link only when a real URL is provided.
  if (link) {
    const anchor = document.createElement("a");

    anchor.href = link;
    anchor.textContent = "View Repository →";
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.className = "project-link";

    article.appendChild(anchor);
  }

  return article;
}

if (projectsGrid) {
  const fragment = document.createDocumentFragment();

  projects.forEach((project) => {
    const card = createProjectCard(
      project.name,
      project.description,
      project.link
    );

    fragment.appendChild(card);
  });

  projectsGrid.replaceChildren(fragment);
}


// 3. Fetch & Render GitHub Repositories

const githubReposContainer = document.querySelector("#github-repos");

async function fetchGitHubRepos() {
  if (!githubReposContainer) return;

  try {
    const response = await fetch(
      "https://api.github.com/users/alikassem877/repos?sort=updated&per_page=6"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch GitHub repositories.");
    }

    const repos = await response.json();

    if (!Array.isArray(repos)) {
      throw new Error("Invalid GitHub API response.");
    }

    if (repos.length === 0) {
      const message = document.createElement("p");
      message.textContent = "No public repositories found.";

      githubReposContainer.replaceChildren(message);
      return;
    }

    const fragment = document.createDocumentFragment();

    repos.forEach((repo) => {
      const card = createProjectCard(
        repo.name,
        repo.description || "No description provided for this repository."
      );

      // Accept only GitHub HTTPS repository URLs.
      if (
        typeof repo.html_url === "string" &&
        repo.html_url.startsWith("https://github.com/")
      ) {
        const anchor = document.createElement("a");

        anchor.href = repo.html_url;
        anchor.textContent = "View Repository →";
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
        anchor.className = "project-link";

        card.appendChild(anchor);
      }

      fragment.appendChild(card);
    });

    githubReposContainer.replaceChildren(fragment);

  } catch (error) {
    console.error("GitHub API error:", error);

    const errorMessage = document.createElement("p");
    errorMessage.className = "loading-text";
    errorMessage.textContent =
      "Could not load GitHub repositories at this time.";

    githubReposContainer.replaceChildren(errorMessage);
  }
}

fetchGitHubRepos();
