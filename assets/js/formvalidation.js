document.getElementById('contactform').onsubmit = () => {
  const fullName = document.getElementById('full-name').value;
  const email = document.getElementById('email').value;
  const contents = document.getElementById('contents').value;
  if (email === email.toLowerCase()) {
    const allFields = {
      full_name: fullName,
      user_email: email,
      user_contents: contents,
    };
    localStorage.setItem('contacts_info', JSON.stringify(allFields));
    return true;
  }
  const messege = document.getElementById('message-div');
  messege.style.display = 'block';
  messege.textContent = 'Email must be in lower case';
  return false;
};
