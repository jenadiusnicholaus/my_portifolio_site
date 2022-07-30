import Api from './api.js';


const logoToggleClass = (element, toggleClass) => {
  element.classList.toggle(toggleClass);
};

// create an hambarger mene
document.querySelectorAll('.hamburger-mobile-icon').forEach((hamburgIcon) => {
  hamburgIcon.addEventListener('click', () => {
    hamburgIcon.classList.toggle('open');
    logoToggleClass(document.querySelector('.logo'), 'dark-logo');
  });
});

window.addEventListener('load', async () => {
  const workCardContainer = document.getElementById('work-card-container');
  const recentworktitle = document.getElementById('recentworktitle');
  const recentworkdesc = document.getElementById('recentworkdesc');
  const img = document.getElementById('recent-work-image');
  const techOne = document.getElementById('tech-1');
  const techTwo = document.getElementById('tech-2');
  const techThree = document.getElementById('tech-3');
  workCardContainer.innerHTML = '';
  let htmlCard = '';
  const projectData  = await Api.getProjects();

  // Update recent project dynamicaly
  recentworktitle.textContent = projectData[0].name;
  img.setAttribute('src', projectData[0].image);
  recentworkdesc.textContent = projectData[0].description;
  // [techOne.value, techTwo.value, techThree.value] = projectData[0].technologies;

  // get data from  local storage
  const retrievedObject = localStorage.getItem('contacts_info');
  const parseJson = JSON.parse(retrievedObject);
  // document.getElementById('full-name').value = parseJson.full_name ? parseJson.full_name : '';
  // document.getElementById('email').value = parseJson.user_email ? parseJson.user_email : '';
  // document.getElementById('contents').value = parseJson.user_contents ? parseJson.user_contents : '';


  for (let index = 0; index <  projectData.length; index += 1) {
    const project =  projectData[index];
    console.log(project)

    htmlCard += `<div class="card-container">
    <div class="work-card">
        <div class="work-card-body">
            <h1>${project.title}</h1>
            <p class="work-description">
            ${project.description}
            </p>
            <div class="work-tech-stack">
                <ul class="ul-links">
                <li class="t-stack"><a type="button" class="btn-tech-stacks">${project.technologies[0].name}</a></li>
                <li class="t-stack"><a type="button" class="btn-tech-stacks">${project.technologies[1].name}</a></li>
                <li class="t-stack"><a type="button" class="btn-tech-stacks">${project.technologies[2].name}</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="work-card-footer">
        <button value="${project.id}" type="button" class="footer-btn">See Project </button>
    </div>
    </div>`;
  }

  workCardContainer.innerHTML = htmlCard;
  const recent_works_card = document.querySelector('.work-card');
  // recent_works_card.style.background= "linear-gradient(180.45deg, rgba(38, 38, 38, 0) 0.75%, rgba(34, 32, 32, 0.184) 61.94%), url('./img/maskimage.png')";
});
