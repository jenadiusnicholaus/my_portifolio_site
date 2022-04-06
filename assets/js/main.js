const projectData = [
  {
    id: 1,
    name: 'To do list Project',
    description: '"To-do list" is a tool that helps to organize your day. It simply lists the things that you need to do and allows you to mark them as complete. I will build a simple website that allows for doing that, and i will do it using ES6 and Webpack!',
    featured: 'jenad',
    image: 'assets/img/mytodo2.png',
    technologies: [
      'Html',
      'Css',
      'Javascripts',
      'jest',
    ],
    link_to_live_version: 'https://jenadiusnicholaus.github.io/To-Do-list/',
    link_to_source: 'https://github.com/jenadiusnicholaus/To-Do-list',
  },

];
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

window.addEventListener('load', () => {
  const workCardContainer = document.getElementById('work-card-container');
  const recentworktitle = document.getElementById('recentworktitle');
  const recentworkdesc = document.getElementById('recentworkdesc');
  const img = document.getElementById('img');
  const techOne = document.getElementById('tech-1');
  const techTwo = document.getElementById('tech-2');
  const techThree = document.getElementById('tech-3');
  workCardContainer.innerHTML = '';
  let htmlCard = '';

  // Update recent project dynamicaly
  recentworktitle.textContent = projectData[0].name;
  img.setAttribute('src', projectData[0].image);
  recentworkdesc.textContent = projectData[0].description;
  [techOne.value, techTwo.value, techThree.value] = projectData[0].technologies;

  // get data from storage
  const retrievedObject = localStorage.getItem('contacts_info');
  const parseJson = JSON.parse(retrievedObject);
  document.getElementById('full-name').value = parseJson.full_name ? parseJson.full_name : '';
  document.getElementById('email').value = parseJson.user_email ? parseJson.user_email : '';
  document.getElementById('contents').value = parseJson.user_contents ? parseJson.user_contents : '';

  for (let index = 0; index < projectData.length; index += 1) {
    const project = projectData[index];
    htmlCard += `<div class="card-container">
    <div class="work-card">
        <div class="work-card-body">
            <h1>${project.name}</h1>
            <p class="work-description">
            ${project.description}
            </p>
            <div class="work-tech-stack">
                <ul class="ul-links">
                <li class="t-stack"><a type="button" class="btn-tech-stacks">${project.technologies[0]}</a></li>
                <li class="t-stack"><a type="button" class="btn-tech-stacks">${project.technologies[1]}</a></li>
                <li class="t-stack"><a type="button" class="btn-tech-stacks">${project.technologies[2]}</a></li>
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
});
