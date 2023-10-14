const logo = document.getElementById('dvd-logo');
const container = document.querySelector('.logo-container');

let x = 0;
let y = 0;
let xSpeed = 2;
let ySpeed = 2;

function animateLogo() {
  x += xSpeed;
  y += ySpeed;

  const maxX = window.innerWidth - logo.width *1.30;
  const maxY = window.innerHeight - logo.height/2;

  if (x < -15 || x > maxX) {
    xSpeed = -xSpeed;
  }

  if (y < -15 || y > maxY) {
    ySpeed = -ySpeed;
  }

  logo.style.transform = `translate(${x}px, ${y}px)`;

  requestAnimationFrame(animateLogo);
}

animateLogo();

function openTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
      tab.style.display = 'none';
    });
  
    // Show the selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
      selectedTab.style.display = 'block';
    }
  }

// Email
// ------------------------------------------------------
// ------------------------------------------------------
function sendEmail() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Send the data to the server
  fetch('/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      email: email,
      message: message,
    }),
  })
 .then(response => {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
})
.then(data => {
  if (data.success) {
    alert('Email sent successfully!');
  } else {
    alert('Failed to send email. Please try again later.');
  }
})
.catch(error => {
  console.error('Error:', error);
  alert('An error occurred. Please try again later.');
});

  // Clear the form
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('message').value = '';
}
