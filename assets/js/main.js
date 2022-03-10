const projectData = [
  {
    name: 'Multi-Post Stories',
    description: 'A daily selection of privately personalized reads; no accounts or sign-ups required. has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a standard dummy text',
    featured: 'jenad',
    image: 'jenad',
    technologies: [
      'Html',
      'Css',
      'Bootstrap',
      'Ruby',
    ],
    link_to_live_version: 'https://jenadiusnicholaus.github.io/my-portfolio-site/',
    link_to_source: 'https://github.com/jenadiusnicholaus/my-portfolio-site',
  },

  {
    name: 'Multi-Post Stories',
    description: 'A daily selection of privately personalized reads; no accounts or sign-ups required. has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a standard dummy text',
    featured: 'jenad',
    image: 'jenad',
    technologies: [
      'Html',
      'Css',
      'Bootstrap',
      'Ruby',
    ],
    link_to_live_version: 'https://jenadiusnicholaus.github.io/my-portfolio-site/',
    link_to_source: 'https://github.com/jenadiusnicholaus/my-portfolio-site',
  },

  {
    name: 'Multi-Post Stories',
    description: 'A daily selection of privately personalized reads; no accounts or sign-ups required. has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a standard dummy text',
    featured: 'jenad',
    image: 'jenad',
    technologies: [
      'Html',
      'Css',
      'Bootstrap',
      'Ruby',
    ],
    link_to_live_version: 'https://jenadiusnicholaus.github.io/my-portfolio-site/',
    link_to_source: 'https://github.com/jenadiusnicholaus/my-portfolio-site',
  },

  {
    name: 'Multi-Post Stories',
    description: 'A daily selection of privately personalized reads; no accounts or sign-ups required. has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a standard dummy text',
    featured: 'jenad',
    image: 'jenad',
    technologies: [
      'Html',
      'Css',
      'Bootstrap',
      'Ruby',
    ],
    link_to_live_version: 'https://jenadiusnicholaus.github.io/my-portfolio-site/',
    link_to_source: 'https://github.com/jenadiusnicholaus/my-portfolio-site',
  },

  {
    name: 'Multi-Post Stories',
    description: 'A daily selection of privately personalized reads; no accounts or sign-ups required. has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a standard dummy text',
    featured: 'jenad',
    image: 'jenad',
    technologies: [
      'Html',
      'Css',
      'Bootstrap',
      'Ruby',
    ],
    link_to_live_version: 'https://jenadiusnicholaus.github.io/my-portfolio-site/',
    link_to_source: 'https://github.com/jenadiusnicholaus/my-portfolio-site',
  },
];

const logoToggleClass = (element, toggleClass) => {
  element.classList.toggle(toggleClass);
};

document.querySelectorAll('.hamburger-mobile-icon').forEach((hamburgIcon) => {
  hamburgIcon.addEventListener('click', () => {
    hamburgIcon.classList.toggle('open');
    logoToggleClass(document.querySelector('.logo'), 'dark-logo');
  });
});

window.addEventListener("load", (event) => {
  let workCardContainer = document.getElementById('work-card-container').innerHTML = '';
  console.log(workCardContainer);
  let card = '';
  for ( let index = 0; index < projectData.length;  index ++) {
    console.log(index);
    card += `<div class="card-container">
    <div class="work-card">
        <div class="work-card-body">
            <h1>Professional Art print Data</h1>
            <p class="work-description">
                A daily selection of privately personalized reads; no accounts or sign-ups required. has been the industry's standard
            </p>
            <div class="work-tech-stack">
                <ul class="ul-links">
                    <li class="t-stack"><button type="button" class="btn-tech-stacks">html</button></li>
                    <li class="t-stack"><button type="button" class="btn-tech-stacks">bootstrap</button></li>
                    <li class="t-stack"><button type="button" class="btn-tech-stacks">Ruby</button></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="work-card-footer">
        <button type="button" class="footer-btn">See Project </button>
    </div>
</div>`;
};
// console.log(card)
let j= workCardContainer.innerHTML = card;
console.log(j)
});