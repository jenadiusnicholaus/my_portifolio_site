document.getElementById('contactform').onsubmit = () => {
  const email = document.getElementById('email').value;
  if (email === email.toLowerCase()) {
    return true;
  }
  const messege = document.getElementById('message-div');
  messege.style.display = 'block';
  messege.textContent = 'Email must be in lower case';
  return false;
};