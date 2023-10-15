const logo = document.getElementById('dvd-logo');
const container = document.querySelector('.logo-container');

let x = 0;
let y = 0;
let xSpeed = 2;
let ySpeed = 2;

function animateLogo() {
  x += xSpeed;
  y += ySpeed;

  const maxX = window.innerWidth - logo.width;
  const maxY = window.innerHeight - logo.height;

  if (x < 0 || x > maxX) {
    xSpeed = -xSpeed;
  }

  if (y < 0 || y > maxY) {
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
  let btn = document.getElementById("btn");

  btn.onclick = function(){
    document.body.classList.toggle("dark-theme");
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
      message => alert("message")
);

}


const codeLines = [
  'print("Hello, World!")',
  'for i in range(5):',
  '    print("Line", i)',
  'print("End of code")'
];

const codeContainer = document.getElementById('python-code');
let currentLineIndex = 0;

function animateCode() {
  const currentLine = codeLines[currentLineIndex];
  const currentCode = currentLine.substring(0, codeContainer.innerHTML.length + 1);
  codeContainer.innerHTML = currentCode;

  if (currentCode === currentLine) {
    setTimeout(() => {
      eraseCode();
    }, 1000); // Wait for 1 second before erasing
  } else {
    setTimeout(animateCode, 50); // Adjust the speed of animation if needed
  }
}

function eraseCode() {
  const currentLine = codeLines[currentLineIndex];
  const currentCode = currentLine.substring(0, codeContainer.innerHTML.length - 1);
  codeContainer.innerHTML = currentCode;

  if (currentCode === '') {
    currentLineIndex = (currentLineIndex + 1) % codeLines.length; // Move to the next line
    setTimeout(animateCode, 500); // Wait for 0.5 seconds before writing the next line
  } else {
    setTimeout(eraseCode, 50); // Adjust the speed of erasing if needed
  }
}

animateCode(); // Start the animation