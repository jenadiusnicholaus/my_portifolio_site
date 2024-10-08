import Api from "./api.js";

const logoToggleClass = (element, toggleClass) => {
  element.classList.toggle(toggleClass);
};

// create an hambarger menu
document.querySelectorAll(".hamburger-mobile-icon").forEach((hamburgIcon) => {
  hamburgIcon.addEventListener("click", () => {
    hamburgIcon.classList.toggle("open");
    logoToggleClass(document.querySelector(".logo"), "dark-logo");
  });
});

// createBTN
// const createBtn = () => {
//   // <button id="recentProjectBtn" type="button" class="btn">
//   //   See Project
//   // </button>;
//   const btn = document.createElement("button");
//   btn.setAttribute("id", "recentProjectBtn");
//   btn.setAttribute("type", "button");
//   btn.setAttribute("class", "btn");
//   btn.textContent = "See Project";
//   btn.style.display = "block";
//   btn.addEventListener("click", async (event) => {
//     const projectDataTwo = await Api.getProjects();
//     const recenwork = projectDataTwo[projectDataTwo.length - 1];
//     modal.style.display = "block";
//     workTitle.textContent = recenwork.name;
//     workDescription.textContent = recenwork.description;
//     liveLink.setAttribute("href", recenwork.link_to_live_version);
//     source.setAttribute("href", recenwork.link_to_source);
//     document
//       .getElementById("project-image")
//       .setAttribute("src", recenwork.image);
//   });
//   return btn;
// };

window.addEventListener("load", async () => {
  const workCardContainer = document.getElementById("work-card-container");
  const recentworktitle = document.getElementById("recentworktitle");
  const recentworkdesc = document.getElementById("recentworkdesc");
  const img = document.getElementById("recent-work-image");
  const techOne = document.getElementById("tech-1");
  const techTwo = document.getElementById("tech-2");
  const techThree = document.getElementById("tech-3");
  workCardContainer.innerHTML = "";
  let htmlCard = "";
  const projectData = await Api.getProjects();

  // Update recent project dynamically
  recentworktitle.textContent = projectData[projectData.length - 1].name;
  img.setAttribute("src", projectData[projectData.length - 1].image);
  recentworkdesc.textContent = projectData[projectData.length - 1].description;
  // [techOne.value, techTwo.value, techThree.value] = projectData[0].technologies;

  // get data from  local storage
  const retrievedObject = localStorage.getItem("contacts_info");
  const parseJson = JSON.parse(retrievedObject);

  const newdata = projectData.sort(
    (a, b) => projectData.indexOf(b) - projectData.indexOf(a)
  );
  for (let index = 0; index < newdata.length; index += 1) {
    const project = newdata[index];

    let techStackHTML = "";
    project.technologies.forEach((tech) => {
      techStackHTML += `<li class="t-stack"><a type="button" class="btn-tech-stacks">${tech.name}</a></li>`;
    });
    // <li class="t-stack"><a type="button" class="btn-tech-stacks">${project.technologies[0].name}</a></li>
    // <li class="t-stack"><a type="button" class="btn-tech-stacks">${project.technologies[1].name}</a></li>
    // <li class="t-stack"><a type="button" class="btn-tech-stacks">${project.technologies[2].name}</a></li>

    htmlCard += `<div class="card-container">
    <div class="work-card">
        <div class="work-card-body">
            <h1>${project.title}</h1>
            <p class="work-description">
            ${project.description}
            </p>
            <div class="work-tech-stack">
                <ul class="ul-links tech-slider">
                  ${techStackHTML}

                </ul>
            </div>
        </div>
    </div>
    <div class="work-card-footer">
        <button value="${project.id}" type="button" class="footer-btn">See Project </button>
    </div>
    </div>`;
  }

  document.getElementById("recentProjectBtn").style.display = "block";
  //.shimmer-text
  const shimmerText = document.querySelectorAll(".shimmer-text");
  shimmerText.forEach((text) => {
    text.style.display = "none";
  });

  // let buttons = document.getElementsByClassName("btn-see-project");
  // let newElement = createBtn(); // Assuming createBtn() returns a Node

  // for (let i = 0; i < buttons.length; i++) {
  //   buttons[i].appendChild(newElement.cloneNode(true));
  // }

  workCardContainer.innerHTML = htmlCard;
  const recent_works_card = document.querySelector(".work-card");
  // recent_works_card.style.background= "linear-gradient(180.45deg, rgba(38, 38, 38, 0) 0.75%, rgba(34, 32, 32, 0.184) 61.94%), url('./img/maskimage.png')";
});
