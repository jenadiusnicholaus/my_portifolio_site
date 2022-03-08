
var logoToggleClass = function(element, toggleClass) {
  element.classList.toggle(toggleClass);
}

function toggleMobileMenu(menu) {
  menu.classList.toggle('open');
  logoToggleClass(document.querySelector('.logo'), 'dark-logo')
}



