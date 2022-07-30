import Api from "./api.js";
const modal = document.getElementById('project-modal');
const workDescription = document.getElementById('work-description');
const workTitle = document.getElementById('title');
const liveLink = document.getElementById('live-link');
const source = document.getElementById('work-source');

document.getElementById('recentProjectBtn').onclick =  async () => {
   const projectDataTwo = await Api.getProjects()
  const recenwork = projectDataTwo[0];
  modal.style.display = 'block';
  workTitle.textContent = recenwork.name;
  workDescription.textContent = recenwork.description;
  liveLink.setAttribute('href', recenwork.link_to_live_version);
  source.setAttribute('href', recenwork.link_to_source);
  document.getElementById('project-image').setAttribute('src', recenwork.image);
};

// document.getElementById('recent-work-image').setAttribute('src', projectDataTwo[0].image);
// close modal
document.getElementsByClassName('close')[0].onclick = () => {
  modal.style.display = 'none';
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// set links on click
document.getElementById('work-card-container').addEventListener('click', async (event) => {
  const isButton = event.target.nodeName === 'BUTTON';

  if (!isButton) {
    console.log(isButton)
    return;
  }
  const projectDataTwo = await Api.getProjects()

  projectDataTwo.forEach((item) => {
    if (parseInt(event.target.value, 10) === item.id) {
      modal.style.display = 'block';
      workTitle.textContent = item.name;
      workDescription.textContent = item.description;
      liveLink.setAttribute('href', item.link_to_live_version);
      source.setAttribute('href', item.link_to_source);
      document.getElementById('project-image').setAttribute('src', item.image);
    }
    return item;
  });
});
