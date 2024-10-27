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
      <img src="${project.image}" alt="${project.alt}" />
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
  } catch (error) {
    console.error("Error loading content:", error);
  }
}

function workExperienceTemplate(workExperience) {
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("content");
  contentDiv.innerHTML = `
  <div class="header">
        <div class="employment">
          <h4 class="position">${workExperience.position}</h4>
          <h4 class="company">
            ${workExperience.company}<span class="type">${
    workExperience.type
  }</span>
          </h4>
        </div>
        <div class="date">${workExperience.date}</div>
      </div>
      <div class="responsibilities">
        <ul>
          ${workExperience.responsibilities
            .map((responsibility) => `<li>${responsibility}</li>`)
            .join("")}
        </ul>
    </div>
  `;
  return contentDiv;
}

function educationTemplate(education) {
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("content");
  contentDiv.innerHTML = `
  <div class="header">
        <div class="degree-info">
          <h4 class="major">
            ${education.major} <span class="degree">${education.degree}</span>
          </h4>
          <h4 class="university">${education.university}</h4>
        </div>
        <div class="date">${education.date}</div>
      </div>
      <div class="coursework">
        <ul>
          ${education.coursework.map((course) => `<li>${course}</li>`).join("")}
        </ul>
      </div>
  `;
  return contentDiv;
}

function skillsTemplate(skills) {
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("content");
  contentDiv.innerHTML = `
  <div class="header">
    <h4 class="category">${skills.category}</h4>
  </div>
  <div class="items">
    <ul>
      ${skills.items.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  </div>
  `;
  return contentDiv;
}

function awardsTemplate(awards) {
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("content");
  contentDiv.innerHTML = `
  <div class="header">
    <h4 class="title">${awards.title}</h4>
    <h4 class="awarding-body">${awards.awardingBody}</h4>
  </div>
  <p class="description">${awards.description}</p>
  `;
  return contentDiv;
}

async function loadContacts() {
  fetch("static/json/contacts.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector("#contact .content .items");
      container.innerHTML = "";

      data.forEach((contact) => {
        const contactDiv = document.createElement("div");
        contactDiv.classList.add("contact");

        contactDiv.innerHTML = `
          <i class="${contact.icon}"></i>
          <a href="${contact.link}">${contact.linkText}</a>
          `;

        container.appendChild(contactDiv);
      });
    })
    .catch((error) => console.error("Error loading contacts:", error));
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
    "work-experience",
    workExperienceTemplate
  );
  fetchAndRenderContent(
    "static/json/education.json",
    "education",
    educationTemplate
  );
  fetchAndRenderContent("static/json/skills.json", "skills", skillsTemplate);
  fetchAndRenderContent("static/json/awards.json", "awards", awardsTemplate);
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
  document.getElementById("toggle-light").classList.toggle("active", theme === "light");
  document.getElementById("toggle-dark").classList.toggle("active", theme === "dark");
}

function initTheme() {
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = systemPrefersDark ? "dark" : "light";
  setTheme(theme);
}


window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  const newTheme = e.matches ? "dark" : "light";
  setTheme(newTheme);
});

document.addEventListener("DOMContentLoaded", initTheme);
