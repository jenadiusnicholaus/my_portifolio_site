// Use existing Api class from api.js - no need to redeclare
const modal = document.getElementById("project-modal");
const workDescription = document.getElementById("work-description");
const workTitle = document.getElementById("title");
const liveLink = document.getElementById("live-link");
const source = document.getElementById("work-source");

const recentProjectBtn = document.getElementById("recentProjectBtn");
if (recentProjectBtn) {
  recentProjectBtn.onclick = async () => {
    const projectDataTwo = await Api.getProjects();
    const projects = Array.isArray(projectDataTwo) ? projectDataTwo : (projectDataTwo?.results || []);
    
    // Sort projects by ID (newest first - higher ID = latest project)
    const sortedProjects = projects.sort((a, b) => {
      return b.id - a.id; // Newest first (highest ID first)
    });
    
    const recentwork = sortedProjects[0]; // Get the latest project
    modal.classList.add("show");
    workTitle.textContent = recentwork.title;
    workDescription.textContent = recentwork.description;
    liveLink.setAttribute("href", recentwork.link_to_live_version);
    source.setAttribute("href", recentwork.link_to_source);
    document.getElementById("project-image").setAttribute("src", recentwork.image);
  };
}

// document.getElementById('recent-work-image').setAttribute('src', projectDataTwo[0].image);
// close modal
document.getElementsByClassName("close")[0].onclick = () => {
  modal.classList.remove("show");
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.classList.remove("show");
  }
};

// set links on click
const workCardContainer = document.getElementById("work-card-container");
if (workCardContainer) {
  workCardContainer.addEventListener("click", async (event) => {
    const isButton = event.target.nodeName === "BUTTON";

    if (!isButton) {
      console.log(isButton);
      return;
    }
    const projectDataTwo = await Api.getProjects();

    if (projectDataTwo && projectDataTwo.results) {
      projectDataTwo.results.forEach((item) => {
        if (parseInt(event.target.value, 10) === item.id) {
          modal.classList.add("show");
          workTitle.textContent = item.title;
          workDescription.textContent = item.description;
          liveLink.setAttribute("href", item.link_to_live_version);
          source.setAttribute("href", item.link_to_source);
          document
            .getElementById("project-image")
            .setAttribute("src", item.image);
        }
        return item;
      });
    }
  });
}
