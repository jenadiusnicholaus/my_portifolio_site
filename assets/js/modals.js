const projectDataTwo = [
  {
    id: 1,
    name: 'Multi-Post Stories',
    description: 'A daily selection of privately personalized reads; no accounts or sign-ups required. has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a standard dummy text',
    featured: 'jenad',
    image: 'assets/img/imageplaceholder.png',
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

    id: 2,
    name: 'Multi-Post Stories',
    description: 'A daily selection of privately personalized reads; no accounts or sign-ups required. has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a standard dummy text',
    featured: 'jenad',
    image: 'https://github.com/jenadiusnicholaus/my-portfolio-site/blob/main/assets/img/mobileversion.png',
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

    id: 3,
    name: 'Multi-Post Stories',
    description: 'A daily selection of privately personalized reads; no accounts or sign-ups required. has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a standard dummy text',
    featured: 'jenad',
    image: 'https://github.com/jenadiusnicholaus/my-portfolio-site/blob/main/assets/img/mobileversion.png',
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

    id: 4,
    name: 'Multi-Post Stories',
    description: 'A daily selection of privately personalized reads; no accounts or sign-ups required. has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a standard dummy text',
    featured: 'jenad',
    image: 'https://github.com/jenadiusnicholaus/my-portfolio-site/blob/main/assets/img/mobileversion.png',
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
    id: 5,
    name: 'Multi-Post Stories',
    description: 'A daily selection of privately personalized reads; no accounts or sign-ups required. has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a standard dummy text',
    featured: 'jenad',
    image: 'https://github.com/jenadiusnicholaus/my-portfolio-site/blob/main/assets/img/mobileversion.png',
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

const modal = document.getElementById('project-modal');
const workDescription = document.getElementById('work-description');
const workTitle = document.getElementById('title');
const liveLink = document.getElementById('live-link');
const source = document.getElementById('work-source');

document.getElementById('recentProjectBtn').onclick = () => {
  const recenwork =  projectDataTwo[0];
  modal.style.display = 'block';
  workTitle.textContent = recenwork.name;
  workDescription.textContent = recenwork.description;
  liveLink.setAttribute('href', recenwork.link_to_live_version);
  source.setAttribute('href', recenwork.link_to_source);
};

document.getElementsByClassName('close')[0].onclick = () => {
  modal.style.display = 'none';
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

document.getElementById('work-card-container').addEventListener('click', (event) => {
  const isButton = event.target.nodeName === 'BUTTON';

  if (!isButton) {
    return;
  }

   projectDataTwo.filter((item) => {
    if (parseInt(event.target.value, 10) === item.id) {
      modal.style.display = 'block';
      workTitle.textContent = item.name;
      workDescription.textContent = item.description;
      liveLink.setAttribute('href', item.link_to_live_version);
      source.setAttribute('href', item.link_to_source);
    }
    return item;
  });
});
