function updateTitle() {
  if (window.innerWidth <= 768) {
    document.getElementById("title").innerHTML = "S. M. F. R. Labib";
  } else {
    document.getElementById("title").innerHTML = "S. M. Fazle Rabby Labib";
  }
}

window.addEventListener("resize", updateTitle);
window.addEventListener("load", updateTitle);

async function fetchAndRenderContent(jsonPath, containerId, templateFunction) {
  try {
    const response = await fetch(jsonPath);
    const data = await response.json();
    const container = document.getElementById(containerId);

    let contentsDiv = container.querySelector(".contents");
    if (!contentsDiv) {
      contentsDiv = document.createElement("div");
      contentsDiv.classList.add("contents");
      container.appendChild(contentsDiv);
    }

    data.forEach((item) => {
      contentsDiv.appendChild(templateFunction(item));
    });
  } catch (error) {
    console.error(`Error loading content for ${containerId}:`, error);
  }
}

function projectTemplate(project) {
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("content");
  contentDiv.innerHTML = `
  <div class="title-date">
    <h3 class="title">${project.title}</h3>
    <div class="date">${project.date}</div>
  </div>
  <div class="tools">
    ${project.tools.map((tool) => `<span>${tool}</span>`).join("")}
  </div>
  <div class="project-image">
    <a href="${project.link}">
      <img src="${project.image}" alt="${project.alt}" loading="lazy"/>
    </a>
  </div>
  `;
  return contentDiv;
}

function researchTemplate(research) {
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("content");
  contentDiv.innerHTML = `
    <div class="title-date">
      <h3 class="title">${research.title}</h3>
      <div class="date">${research.date}</div>
    </div>
    <div class="publication">
      <h3 class="publisher">${research.publisher}</h3>
      <a class="link" href="${research.paperLink}" target="_blank" rel="noopener noreferrer" title="Paper">
        <i class="fas fa-link"></i> Paper
      </a>
      <a class="link" href="${research.codeLink}" target="_blank" rel="noopener noreferrer" title="Code">
        <i class="fa-solid fa-code"></i> Code
      </a>
    </div>
    <div class="authors">
      <h4>${research.authors}</h4>
    </div>
    <div class="abstract">
      <p>${research.abstract}</p>
    </div>
  `;
  return contentDiv;
}

async function loadAboutContent() {
  try {
    const response = await fetch("static/json/about.json");
    const data = await response.json();

    document.getElementById("article-content").textContent = data.about.article;
    document.getElementById("profile-image").src = data.about.profileImage;

    const interestsContainer = document.querySelector(".research-interests");
    if (interestsContainer) {
      interestsContainer.innerHTML = ""; // clear if needed
      data.about.researchInterests.forEach((interest) => {
        const span = document.createElement("span");
        span.textContent = interest;
        interestsContainer.appendChild(span);
      });
    }
  } catch (error) {
    console.error("Error loading content:", error);
  }
}


function workExperienceTemplate(workExperience) {
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("content");
  contentDiv.innerHTML = `
    <div class="work-item">
      <div class="company-logo">
      <img src="${workExperience.logo}" class="filter-icon" />
      </div>
      <div class="work-details">
        <div class="work-header">
          <h4 class="company-name">${workExperience.company}</h4>
          <span class="work-duration">${workExperience.date}</span> 
        </div>
        <p class="work-role">${workExperience.position} | ${workExperience.type}</p>
      </div>
    </div>
  `;
  return contentDiv;
}

function educationTemplate(education) {
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("education-item");
  contentDiv.innerHTML = `
    <div class="university-logo">
      <img src="${education.universityMonogram}" class="filter-icon" />
    </div>
    <div class="education-details">
      <p class="degree">BSc. ${education.major}, ${education.date}</p>
      <p class="university-name">${education.university}</p>
    </div>
  `;
  return contentDiv;
}

async function loadContacts() {
  try {
    const response = await fetch("static/json/contacts.json");
    const data = await response.json();

    const container = document.querySelector(".contact-icons");
    container.innerHTML = "";

    data.forEach((contact) => {
      const a = document.createElement("a");
      a.href = contact.link;
      a.title = contact.title || contact.linkText || "";
      if (contact.link.startsWith("http")) a.target = "_blank";

      const icon = document.createElement("i");
      icon.className = contact.icon;

      a.appendChild(icon);
      container.appendChild(a);
    });
  } catch (error) {
    console.error("Error loading contacts:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchAndRenderContent(
    "static/json/projects.json",
    "projects",
    projectTemplate
  );
  fetchAndRenderContent(
    "static/json/research.json",
    "research",
    researchTemplate
  );
  loadAboutContent();
  fetchAndRenderContent(
    "static/json/work-experience.json",
    "work",
    workExperienceTemplate
  );
  fetchAndRenderContent(
    "static/json/education.json",
    "education",
    educationTemplate
  );
  loadContacts();
});

function updateTime() {
  const now = new Date();
  const options = {
    timeZoneName: "short",
  };
  document.getElementById("time").textContent = now.toLocaleTimeString(
    [],
    options
  );
}

setInterval(updateTime, 1000);
updateTime();

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document
    .getElementById("toggle-light")
    .classList.toggle("active", theme === "light");
  document
    .getElementById("toggle-dark")
    .classList.toggle("active", theme === "dark");
}

function initTheme() {
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const theme = systemPrefersDark ? "dark" : "light";
  setTheme(theme);
}

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    const newTheme = e.matches ? "dark" : "light";
    setTheme(newTheme);
  });

document.addEventListener("DOMContentLoaded", initTheme);

    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
