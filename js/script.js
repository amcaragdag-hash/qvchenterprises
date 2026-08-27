const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

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