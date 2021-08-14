 function onSubmitContact() {
    var btn = document.getElementById("contact__from_submit");
    var btnText = document.getElementById("contact__from_submit_text");

    if(btn.classList.contains("processing")){
        return false;
    }
    btn.classList.add("processing");
    btnText.textContent = "Sending ...";
    makeApiSaveContact();
  }

  function makeApiSaveContact() {
    var name  = document.getElementById("contact-input-name").value;
    var email = document.getElementById("contact-input-email").value;
    var message = document.getElementById("contact-input-message").value;

    var model = {
      name : name,
      email : email,
      body : message
    };

    var xhr = new XMLHttpRequest();
    var url = "https://sinhpd.herokuapp.com/api/v1/add-contact";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {

      if(xhr.readyState === XMLHttpRequest.DONE) {
        var status = xhr.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          // The request has been completed successfully
          alert('We have received your information. Thank you very much!');
             // Reset values input
          document.getElementById("contact-input-name").value = "";
          document.getElementById("contact-input-email").value = "";
          document.getElementById("contact-input-message").value = "";
          document.getElementById("contact__from_submit").classList.remove("processing");
          document.getElementById("contact__from_submit_text").textContent = "Send Message";
        } else {
          // Oh no! There has been an error with the request!
          alert('An error has occurred. Please try again!');
          document.getElementById("contact__from_submit").classList.remove("processing");
          document.getElementById("contact__from_submit_text").textContent = "Send Message";
        }
      }
    };
    var data = JSON.stringify(model);
    xhr.send(data);

  }
