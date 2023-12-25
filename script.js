
const container = document.querySelector('.logo-container');
const dvdLogo = document.getElementById("dvd-logo");
let x = 0, y = 0;
let xSpeed = 2, ySpeed = 2;


function animateLogo() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const logoWidth = dvdLogo.clientWidth;  // Account for the logo's width
  const logoHeight = dvdLogo.clientHeight; // Account for the logo's height

  // Update position
  x += xSpeed;
  y += ySpeed;

  // Check for collision with screen borders and adjust for logo dimensions
  if (x + logoWidth >= screenWidth || x <= 0) {
      xSpeed *= -1;
      // Adjust x to keep within bounds
      x = Math.max(0, Math.min(screenWidth - logoWidth, x));
  }
  if (y + logoHeight >= screenHeight || y <= 0) {
      ySpeed *= -1;
      // Adjust y to keep within bounds
      y = Math.max(0, Math.min(screenHeight - logoHeight, y));
  }

  // Apply position
  dvdLogo.style.left = x + "px";
  dvdLogo.style.top = y + "px";

  dvdLogo.style.transform = `translate(${x}px, ${y}px)`;

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
  let btnText = document.getElementById("btnText");
  let btnIcon = document.getElementById("btnIcon");

  btn.onclick = function(){
    document.body.classList.toggle("dark-theme");

    if( document.body.classList.contains("dark-theme")){
      btnIcon.src = "images/sun.png"
      btnText.innerHTML = "Light"
    }else{
      btnIcon.src = "images/moon.png"
      btnText.innerHTML = "Dark"
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
      message => alert("Message recieved, you will be hearing back from me shortly.")
);

}


const codeLines = [
  'print("Hello, World!")',
  'for i in range(5):',
  'name = input("Enter your name: ")',
  'if number % 2 == 0:',
  'while True:',
  'def merge_sort():'
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