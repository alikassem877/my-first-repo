document.addEventListener("DOMContentLoaded", () => {
  // 1. Theme Toggle & Persistence Setup
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  const themeToggle = document.querySelector("#theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // 2. Render Static/Featured Projects
  const projects = [
    {
      name: "Multi-Tenant Architecture Platform",
      description:
        "A relational database isolation engine featuring shared database and schema strategies built with TypeScript, PostgreSQL, and Prisma.",
      link: "https://github.com/alikassem877",
    },
    {
      name: "Task Management API",
      description:
        "High-performance REST API services built with Node.js, providing structured data isolation and JWT authentication.",
      link: "https://github.com/alikassem877",
    },
    {
      name: "Data Visualization Library",
      description:
        "An open-source utility designed to simplify complex backend metrics reporting and data charts.",
      link: "https://github.com/alikassem877",
    },
  ];

  const projectsGrid = document.querySelector(".projects-grid");
  if (projectsGrid) {
    projectsGrid.innerHTML = projects
      .map(
        (project) => `
            <article class="project-card">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">
                    View Repository &rarr;
                </a>
            </article>
        `,
      )
      .join("");
  }

  // 3. Fetch & Render Live GitHub Repositories
  const githubReposContainer = document.querySelector("#github-repos");

  async function fetchGitHubRepos() {
    if (!githubReposContainer) return;

    try {
      const response = await fetch(
        "https://api.github.com/users/alikassem877/repos?sort=updated&per_page=6",
      );

      if (!response.ok) {
        throw new Error("Failed to fetch GitHub repositories.");
      }

      const repos = await response.json();

      if (repos.length === 0) {
        githubReposContainer.innerHTML = "<p>No public repositories found.</p>";
        return;
      }

      githubReposContainer.innerHTML = repos
        .map(
          (repo) => `
                <article class="project-card">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || "No description provided for this repository."}</p>
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="project-link">
                        View Repository &rarr;
                    </a>
                </article>
            `,
        )
        .join("");
    } catch (error) {
      console.error(error);
      githubReposContainer.innerHTML =
        "<p class='loading-text'>Could not load GitHub repositories at this time.</p>";
    }
  }

  fetchGitHubRepos();
});
