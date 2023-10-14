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
function sendEmail(){
  Email.send({
        Host : "smtp.elasticemail.com",
        Username : "ammar.webfile@gmail.com",
        Password : "A04AD333BFC2C3AF3D63E66C2A2D5C08C9D0",
        To : 'ammar.webfile@gmail.com',
        From : "ammar.webfile@gmail.com",
        Subject : "New form",
        Body : "Name: " + document.getElementById("name").value
              + "<br> Email: " + document.getElementById("email").value
              + "<br> Message: " + document.getElementById("message").value
    }).then(
      message => alert("Message Sent successfully")
);

}
