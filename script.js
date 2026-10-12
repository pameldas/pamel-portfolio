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

/* ========================================
   3D ORBIT ANIMATION AROUND PROFILE PHOTO
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {

    const orbit = document.querySelector(".hero-3d-orbit");

    if (!orbit) return;

    const icons = [...orbit.querySelectorAll(".orbit-item")];

    if (!icons.length) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    let angle = 0;
    let lastTime = null;
    let paused = false;

    orbit.addEventListener("mouseenter", () => {
        paused = true;
    });

    orbit.addEventListener("mouseleave", () => {
        if (!orbit.contains(document.activeElement)) {
            paused = false;
        }
    });

    orbit.addEventListener("focusin", () => {
        paused = true;
    });

    orbit.addEventListener("focusout", () => {
        requestAnimationFrame(() => {
            paused = orbit.matches(":hover") ||
                     orbit.contains(document.activeElement);
        });
    });

    function animate(time) {

        if (lastTime === null) lastTime = time;

        const delta = Math.min(time - lastTime, 50);
        lastTime = time;

        const width = orbit.clientWidth;
        const height = orbit.clientHeight;

        const radiusX = width * 0.46;
        const radiusY = height * 0.21;

        if (!paused && !reducedMotion.matches) {
            // One revolution every 18 seconds
            angle += (delta / 18000) * Math.PI * 2;
        }

        icons.forEach((icon, index) => {

            const theta = angle +
                (index * Math.PI * 2 / icons.length);

            const x = Math.cos(theta) * radiusX;
            const y = Math.sin(theta) * radiusY;

            icon.style.left = `calc(50% + ${x}px)`;
            icon.style.top = `calc(55% + ${y}px)`;

            // Negative sine = behind the portrait
            // Positive sine = in front of the portrait
            
/* Smooth 3D depth and size transition */

const depth = Math.sin(theta);

// Smooth scaling:
// Back: 0.75x
// Middle: 0.875x
// Front: 1.00x
const scale = 0.875 + 0.125 * depth;

// Keep icons behind the portrait on the far side
// and in front on the near side
icon.style.zIndex = depth >= 0 ? "6" : "2";

// Gradually change size instead of jumping
icon.style.transform =
    `translate(-50%, -50%) scale(${scale})`;

// Optional: Slight fading when moving behind
const opacity = 0.85 + 0.15 * ((depth + 1) / 2);

icon.style.opacity = opacity;

        });

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

});
