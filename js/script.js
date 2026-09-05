const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

// Add Buyer Due Diligence and Actual Site Media to the existing live-site navigation
const liveNav = document.querySelector("header nav");
if (liveNav) {
    const contactLink = liveNav.querySelector('a[href="#contact"]');

    if (!liveNav.querySelector('a[href="media.html"]')) {
        const mediaLink = document.createElement("a");
        mediaLink.href = "media.html";
        mediaLink.textContent = "Actual Site Media";
        liveNav.insertBefore(mediaLink, contactLink);
    }

    if (!liveNav.querySelector('a[href="due-diligence.html"]')) {
        const dueDiligenceLink = document.createElement("a");
        dueDiligenceLink.href = "due-diligence.html";
        dueDiligenceLink.textContent = "Due Diligence";
        liveNav.insertBefore(dueDiligenceLink, contactLink);
    }
}

// Add the official Riverside County parcel portal before the Google Maps location link
const googleMapsButton = document.querySelector('.map-copy a[href*="google.com/maps"]');
if (googleMapsButton && !document.querySelector('.map-copy a[href*="rivcoview.rivcoacr.org"]')) {
    const rivCoViewButton = document.createElement("a");
    rivCoViewButton.className = googleMapsButton.className;
    rivCoViewButton.href = "https://rivcoview.rivcoacr.org/#/Property-Search/668080049";
    rivCoViewButton.target = "_blank";
    rivCoViewButton.rel = "noopener noreferrer";
    rivCoViewButton.textContent = "View Property on RivCoView";
    rivCoViewButton.style.marginRight = "12px";
    rivCoViewButton.style.marginBottom = "12px";
    googleMapsButton.parentNode.insertBefore(rivCoViewButton, googleMapsButton);
    googleMapsButton.textContent = "View Area on Google Maps";
}

const clickableImages = Array.from(
    document.querySelectorAll(".concept-card img, .gallery-item img")
);

let currentImageIndex = 0;

function showImage(index) {
    if (index < 0) {
        currentImageIndex = clickableImages.length - 1;
    } else if (index >= clickableImages.length) {
        currentImageIndex = 0;
    } else {
        currentImageIndex = index;
    }

    const image = clickableImages[currentImageIndex];

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
}

clickableImages.forEach((image, index) => {
    image.addEventListener("click", () => {
        currentImageIndex = index;

        showImage(currentImageIndex);

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";
    });
});

function closeLightbox() {
    lightbox.classList.remove("active");

    lightboxImage.src = "";

    document.body.style.overflow = "";
}

function showPreviousImage() {
    showImage(currentImageIndex - 1);
}

function showNextImage() {
    showImage(currentImageIndex + 1);
}

lightboxClose.addEventListener("click", closeLightbox);

lightboxPrev.addEventListener("click", (event) => {
    event.stopPropagation();
    showPreviousImage();
});

lightboxNext.addEventListener("click", (event) => {
    event.stopPropagation();
    showNextImage();
});

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowLeft") {
        showPreviousImage();
    }

    if (event.key === "ArrowRight") {
        showNextImage();
    }
});