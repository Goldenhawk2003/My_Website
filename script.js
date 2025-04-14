function loadComponent(id, file) {
  return fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    });
}

// Initial Load
Promise.all([
  loadComponent("header", "components/header.html"),
  loadComponent("tabs", "components/tabs.html"),
  loadComponent("footer", "components/footer.html")
]).then(() => {
  loadComponent("content", "components/home.html").then(() => {
    setupHome(); // ← run DVD + code animation here
  });
  setupPage(); // ← sets up dark mode + tab button listeners
});

function setupHome() {
  setupDVDLogo();
  animateCode();
}


function setupTabButtons() {
  document.querySelectorAll(".tab-btn").forEach(button => {
    button.addEventListener("click", () => {
      const tabName = button.getAttribute("data-tab");

      loadComponent("content", `components/${tabName}.html`).then(() => {
        const newTab = document.getElementById(tabName);
        if (newTab) {
          setTimeout(() => newTab.classList.add("show"), 10);
        }

        // Only run animations for home
        if (tabName === "home") {
          setupHome();
        }
      });
    });
  });
}

function setupPage() {
  setupDarkModeToggle();
  setupTabButtons();
}

// ------------------- DVD LOGO -------------------
function setupDVDLogo() {
  const dvdLogo = document.getElementById("dvd-logo");
  if (!dvdLogo) return;

  let x = 0, y = 0;
  let xSpeed = 2, ySpeed = 2;

  function animateLogo() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const logoWidth = dvdLogo.clientWidth;
    const logoHeight = dvdLogo.clientHeight;

    x += xSpeed;
    y += ySpeed;

    if (x + logoWidth >= screenWidth || x <= 0) xSpeed *= -1;
    if (y + logoHeight >= screenHeight || y <= 0) ySpeed *= -1;

    dvdLogo.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(animateLogo);
  }

  animateLogo();
}

// ------------------- TAB LOGIC -------------------

// ------------------- DARK MODE -------------------
function setupDarkModeToggle() {
  const btn = document.getElementById("btn");
  const btnText = document.getElementById("btnText");
  const btnIcon = document.getElementById("btnIcon");

  if (!btn || !btnText || !btnIcon) return;

  btn.onclick = function () {
    document.body.classList.toggle("dark-theme");
    btnIcon.src = document.body.classList.contains("dark-theme")
      ? "images/sun.png"
      : "images/moon.png";
    btnText.innerHTML = document.body.classList.contains("dark-theme")
      ? "Light"
      : "Dark";
  };
}

// ------------------- CODE ANIMATION -------------------
const codeLines = [
  'print("Hello, World!")',
  'for i in range(5):',
  'name = input("Enter your name: ")',
  'if number % 2 == 0:',
  'while True:',
  'def merge_sort():',
  'is_sorted( ):'
];

let currentLineIndex = 0;

function animateCode() {
  const codeContainer = document.getElementById("python-code");
  if (!codeContainer) return;

  const currentLine = codeLines[currentLineIndex];
  const currentCode = currentLine.substring(0, codeContainer.innerHTML.length + 1);
  codeContainer.innerHTML = currentCode;

  if (currentCode === currentLine) {
    setTimeout(() => {
      eraseCode(codeContainer);
    }, 1000);
  } else {
    setTimeout(animateCode, 50);
  }
}

function eraseCode(codeContainer) {
  const currentLine = codeLines[currentLineIndex];
  const currentCode = currentLine.substring(0, codeContainer.innerHTML.length - 1);
  codeContainer.innerHTML = currentCode;

  if (currentCode === '') {
    currentLineIndex = (currentLineIndex + 1) % codeLines.length;
    setTimeout(animateCode, 500);
  } else {
    setTimeout(() => eraseCode(codeContainer), 50);
  }
}

// ------------------- EMAIL -------------------
function sendEmail() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const submitBtn = document.querySelector(".submit");

  // Basic validation
  if (!name.value || !email.value || !message.value) {
    alert("Please fill in all fields.");
    return;
  }

  const params = {
    name: name.value,
    email: email.value,
    message: message.value,
    title: "Website Inquiry",
    time: new Date().toLocaleString(),
  };

  // UI feedback: disable button
  submitBtn.disabled = true;
  submitBtn.innerText = "Sending...";

  emailjs.send("service_eimmcef", "template_r4xvlxp", params)
    .then(() => {
      alert("Message sent successfully!");
      // Reset form
      name.value = "";
      email.value = "";
      message.value = "";
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      alert("Oops! Something went wrong. Please try again later.");
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerText = "Submit";
    });
}