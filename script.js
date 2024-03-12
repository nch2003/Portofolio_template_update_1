// Hamburger
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("fa-xmark");
  navbar.classList.toggle("active");
};

document.addEventListener("click", (e) => {
  // Check if the clicked element is outside the navbar
  if (!navbar.contains(e.target) && e.target !== menuIcon) {
    menuIcon.classList.remove("fa-xmark");
    navbar.classList.remove("active");
  }
});

// Scroll to section

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

// Remove the ham-bar when pressing a linkz
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuIcon.classList.remove("fa-xmark");
    navbar.classList.remove("active");
  });
});

window.onscroll = () => {
  let top = window.scrollY;
  let header = document.querySelector("header");

  // Handle sticky navbar
  header.classList.toggle("sticky", top > 100);

  sections.forEach((sec) => {
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    // Check if the section is the home section
    if (sec.classList.contains("home") && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });

      // Add active class to the home link
      let homeLink = document.querySelector(`header nav a[href="#home"]`);
      if (homeLink) {
        homeLink.classList.add("active");
      }
    } else if (top >= offset && top < offset + height) {
      // Remove active class from all links
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });

      // Add active class to the current link
      let activeLink = document.querySelector(`header nav a[href="#${id}"]`);
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });

  // Remove toggle icon and navbar
  menuIcon.classList.remove("fa-xmark");
  navbar.classList.remove("active");
};

// Contact JS

const contactForm = document.getElementById("contact-form");
contactName = document.getElementById("contact-name");
contactEmail = document.getElementById("contact-email");
Message = document.getElementById("message");
contactMessage = document.getElementById("contact-message");

const sendEmail = (e) => {
  e.preventDefault();

  // check if the field has a value
  if (
    contactName.value === "" ||
    contactEmail.value === "" ||
    Message.value === ""
  ) {
    // add and remove color
    contactMessage.classList.remove("color-light");
    contactMessage.classList.add("color-dark");

    // show message
    contactMessage.textContent = "Please complete all input fields";
  } else {
    // serviceID - templateID - #form - publickey
    emailjs
      .sendForm(
        "service_zpti43c",
        "template_d9d79ne",
        "#contact-form",
        "QWosl0M9B_X10_ehl"
      )
      .then(
        () => {
          // show message and add color,
          contactMessage.classList.add("color-light");
          contactMessage.textContent = "Message Sent";

          // remove message after 5 seconds
          setTimeout(() => {
            contactMessage.textContent = "";
          }, 5000);
        },
        (error) => {
          alert("OOPs! SOMETHING WENT WRONG...", error);
        }
      );
  }
};

contactForm.addEventListener("submit", sendEmail);

// Sroll reveal animation
ScrollReveal({
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(".home-img, .portofolio-box, .contact", {
  origin: "bottom",
});
ScrollReveal().reveal(".home-contact h1, .about-content", { origin: "left" });
ScrollReveal().reveal(".home-contact p, .about-content", { origin: "right" });
