function validateForm() {
    let x = document.forms["contactform"]["email-address"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
    console.log('can submit');
  }