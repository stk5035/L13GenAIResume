// Theme toggle
const toggleBtn = document.getElementById("theme-toggle");

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  toggleBtn.textContent = "☀️ Light Mode";
}

// Toggle theme
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");

  // Update button text
  toggleBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";

  // Save preference
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Select all job entries
const jobs = document.querySelectorAll(".job");

jobs.forEach(job => {
  const details = job.querySelector("p");

  // Hide details initially
  details.style.maxHeight = "0px";

  job.addEventListener("click", () => {
    const isOpen = job.classList.contains("active");

    // Close all jobs first (accordion behavior)
    jobs.forEach(j => {
      j.classList.remove("active");
      j.querySelector("p").style.maxHeight = "0px";
    });

    if (!isOpen) {
      job.classList.add("active");
      details.style.maxHeight = details.scrollHeight + "px";

      // Toast message (reuse your existing function)
      const title = job.querySelector("h3").textContent;
      const company = title.split("-")[1]?.trim() || "this company";
      showToast(`Learn more about my role at ${company}`);
    }
  });
});

const skillBars = document.querySelectorAll(".progress");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.getAttribute("data-width");

      bar.style.width = width;

      observer.unobserve(bar); // run only once
    }
  });
}, {
  threshold: 0.5
});

skillBars.forEach(bar => {
  observer.observe(bar);
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

const downloadBtn = document.getElementById("download-pdf");

downloadBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const element = document.body; // entire page

  const opt = {
    margin: 0.5,
    filename: "John_Doe_Resume.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
  };

  html2pdf().set(opt).from(element).save();
});

const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const errorText = document.getElementById("form-error");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  // Email regex (simple but effective)
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;

  // Validation checks
  if (name === "") {
    showError("Please enter your name.");
    return;
  }

  if (!emailPattern.test(email)) {
    showError("Please enter a valid email address.");
    return;
  }

  if (message.length < 10) {
    showError("Message must be at least 10 characters long.");
    return;
  }

  // Success
  errorText.textContent = "";
  alert("Message sent successfully!");

  form.reset();
});

// Helper function
function showError(message) {
  errorText.textContent = message;
}