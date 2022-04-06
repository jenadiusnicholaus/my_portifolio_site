const projectDataTwo = [
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

const modal = document.getElementById('project-modal');
const workDescription = document.getElementById('work-description');
const workTitle = document.getElementById('title');
const liveLink = document.getElementById('live-link');
const source = document.getElementById('work-source');

document.getElementById('recentProjectBtn').onclick = () => {
  const recenwork = projectDataTwo[0];
  modal.style.display = 'block';
  workTitle.textContent = recenwork.name;
  workDescription.textContent = recenwork.description;
  liveLink.setAttribute('href', recenwork.link_to_live_version);
  source.setAttribute('href', recenwork.link_to_source);
  document.getElementById('project-image').setAttribute('src', recenwork.image);
};

document.getElementById('recent-work-image').setAttribute('src', projectDataTwo[0].image);

document.getElementsByClassName('close')[0].onclick = () => {
  modal.style.display = 'none';
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// set links on click
document.getElementById('work-card-container').addEventListener('click', (event) => {
  const isButton = event.target.nodeName === 'BUTTON';

  if (!isButton) {
    return;
  }

  projectDataTwo.forEach((item) => {
    if (parseInt(event.target.value, 10) === item.id) {
      modal.style.display = 'block';
      workTitle.textContent = item.name;
      workDescription.textContent = item.description;
      liveLink.setAttribute('href', item.link_to_live_version);
      source.setAttribute('href', item.link_to_source);
      // document.getElementById('project-image').setAttribute('src', item.image)
    }
    return item;
  });
});
