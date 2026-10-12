const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

/* Certificate Popup Function */

const certificateModal = document.getElementById("certificate-modal");
const certificatePreview = document.getElementById("certificate-preview");
const closeCertificate = document.getElementById("close-certificate");

const certificateCards = document.querySelectorAll(".certificate-gallery a");

certificateCards.forEach(card => {
    card.addEventListener("click", function(event) {
        event.preventDefault();

        const thumbnail = card.querySelector("img");

        certificatePreview.src = thumbnail.src;
        certificatePreview.alt = thumbnail.alt;

        certificateModal.classList.add("active");
    });
});

// Close using X button
closeCertificate.addEventListener("click", function() {
    certificateModal.classList.remove("active");
});

// Close by clicking outside the image
certificateModal.addEventListener("click", function(event) {
    if (event.target === certificateModal) {
        certificateModal.classList.remove("active");
    }
});

// Close using Escape key
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        certificateModal.classList.remove("active");
    }
});

/* Courses & Certifications Show More */

const coursesSection = document.getElementById("courses");
const toggleCourses = document.getElementById("toggleCourses");

if (coursesSection && toggleCourses) {

    toggleCourses.addEventListener("click", function () {

        const expanded =
            coursesSection.classList.toggle("courses-expanded");

        toggleCourses.textContent = expanded
            ? "Show Less ↑"
            : "Show All 12 Certificates ↓";

        toggleCourses.setAttribute(
            "aria-expanded",
            String(expanded)
        );

    });

}

