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

/* Online Course Certificate Popup */

document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById(
        "course-certificate-modal"
    );

    const closeButton = document.getElementById(
        "close-course-certificate"
    );

    const pdfViewer = document.getElementById(
        "course-pdf-viewer"
    );

    const imageViewer = document.getElementById(
        "course-image-viewer"
    );

    if (!modal || !closeButton || !pdfViewer || !imageViewer) {
        return;
    }

    const links = document.querySelectorAll(
        "#courses .course-view-certificate"
    );

    let previousFocus = null;

    function closeModal() {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");

        pdfViewer.removeAttribute("src");
        imageViewer.removeAttribute("src");

        document.body.style.overflow = "";

        if (previousFocus) {
            previousFocus.focus();
        }
    }

    links.forEach(function (link) {

        link.addEventListener("click", function (event) {
            event.preventDefault();

            const file = link.getAttribute("href");

            if (!file) return;

            previousFocus = link;

            pdfViewer.style.display = "none";
            imageViewer.style.display = "none";

            if (/\.pdf$/i.test(file)) {
                pdfViewer.src = encodeURI(file);
                pdfViewer.style.display = "block";
            } else {
                imageViewer.src = encodeURI(file);
                imageViewer.style.display = "block";
            }

            modal.classList.add("active");
            modal.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
            closeButton.focus();
        });

    });

    closeButton.addEventListener("click", closeModal);

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (
            event.key === "Escape" &&
            modal.classList.contains("active")
        ) {
            closeModal();
        }
    });

});


/* =====================================
   COURSE CERTIFICATE POPUP
   ===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("course-certificate-modal");
    const pdfViewer = document.getElementById("course-pdf-viewer");
    const imageViewer = document.getElementById("course-image-viewer");
    const closeButton = document.getElementById("close-course-certificate");
    const courseSection = document.getElementById("courses");

    if (!modal || !pdfViewer || !imageViewer ||
        !closeButton || !courseSection) {
        console.error("Course certificate popup elements are missing.");
        return;
    }

    let lastFocusedElement = null;

    courseSection.addEventListener("click", function (event) {

        const link = event.target.closest(
            "a.course-view-certificate"
        );

        if (!link || !courseSection.contains(link)) return;

        // IMPORTANT: Prevent opening another page
        event.preventDefault();

        const file = link.getAttribute("href");
        if (!file) return;

        lastFocusedElement = link;

        pdfViewer.style.display = "none";
        imageViewer.style.display = "none";

        pdfViewer.removeAttribute("src");
        imageViewer.removeAttribute("src");

        if (/\.pdf(?:[?#]|$)/i.test(file)) {
            pdfViewer.src = file;
            pdfViewer.style.display = "block";
        } else {
            imageViewer.src = file;
            imageViewer.style.display = "block";
        }

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
        closeButton.focus();
    });

    function closeModal() {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");

        pdfViewer.removeAttribute("src");
        imageViewer.removeAttribute("src");

        document.body.style.overflow = "";

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    closeButton.addEventListener("click", closeModal);

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" &&
            modal.classList.contains("active")) {
            closeModal();
        }
    });

});
