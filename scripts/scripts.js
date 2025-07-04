function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("active");
    toggleMenuButton();
}

function closeMenu(event) {
    event.preventDefault();
    toggleMenu();
}

function toggleMenuButton() {
    const menu_button = document.getElementById("menu_button");
    menu_button.classList.toggle("active");
}

const flips = document.querySelectorAll(".flip-container");
Array.from(flips).forEach(function (element) {
    element.addEventListener("click", () => element.classList.toggle("active"));
});

/* Glider.js tuneUp */
function initGlide(glide) {
    const glideInstance = new Glide(glide, {
        bound: true,
        perView: 6,
        breakpoints: {
            1600: {
                perView: 4
            },
            900: {
                perView: 3
            },
            600: {
                perView: 2
            },
            420: {
                perView: 1
            }
        }
    });
    glideInstance.mount({ DisableControls: disableControls });
}

function disableControls(Glide, Components, Events) {
    const PREV_CONTROL_SELECTOR = "[data-glide-dir='<']";
    const NEXT_CONTROL_SELECTOR = "[data-glide-dir='>']";
    const component = {
        buildAfter() {
            this.prevBtn = Components.Html.root.querySelector(
                PREV_CONTROL_SELECTOR
            );
            this.nextBtn = Components.Html.root.querySelector(
                NEXT_CONTROL_SELECTOR
            );
        },
        handleDisable() {
            const perView = Glide.settings.perView;
            const slidesCount = Components.Html.slides.length;
            if (this.prevBtn) this.prevBtn.disabled = Glide.index <= 0;
            if (this.nextBtn)
                this.nextBtn.disabled = Glide.index >= slidesCount - perView;
        },
        toggleSwipeable() {
            const perView = Glide.settings.perView;
            const slidesCount = Components.Html.slides.length;

            const swipeable = perView < slidesCount;
            if (
                (swipeable && !Glide.settings.dragThreshold) ||
                (!swipeable && Glide.settings.dragThreshold)
            ) {
                Glide.update({
                    dragThreshold: swipeable ? 120 : false
                });

                Components.Html._r.classList.toggle("glide--swipeable");
            }
        }
    };

    Events.on("build.after", function () {
        component.buildAfter();
        component.handleDisable();
        component.toggleSwipeable();
    });
    Events.on("run.after", function () {
        component.handleDisable();
        component.toggleSwipeable();
    });
    Events.on("resize", function () {
        component.handleDisable();
        component.toggleSwipeable();
    });
    return component;
}

const glides = document.querySelectorAll(".glide");

glides.forEach((glide) => {
    initGlide(glide);
});

// intersection API lazy load images
const observerImages = new IntersectionObserver(handleImgIntersection);
const images = document.querySelectorAll(".content_img");
images.forEach((image) => observerImages.observe(image));

function handleImgIntersection(entries) {
    entries.map((entry) => {
        if (entry.isIntersecting) {
            entry.target.src = entry.target.dataset.src;
            entry.target.classList.add("content_img--loaded");
            observerImages.unobserve(entry.target);
        }
    });
}

// intersection API animate menus
const observerSectionsOptions = {
    rootMargin: "0px 0px -80% 0px"
};
const observerSections = new IntersectionObserver(
    handleSectionsIntersection,
    observerSectionsOptions
);
const sections = document.querySelectorAll(".menu_section");
sections.forEach((section) => observerSections.observe(section));

const headMenuElements = document.querySelectorAll("#main-header nav ul li a");
const navMenuElements = document.querySelectorAll("#menu ul li a");

function handleSectionsIntersection(entries) {
    entries.map((entry) => {
        if (entry.isIntersecting) {
            const href = entry.target.attributes.id.value;
            updateActiveClass(headMenuElements, href);
            updateActiveClass(navMenuElements, href);
        }
    });
}

function updateActiveClass(elements, href) {
    elements.forEach((element) => {
        if (element.attributes.href.value === "#" + href)
            element.classList.add("active");
        else element.classList.remove("active");
    });
}

function activateLightbox() {
    const heroButon = document.getElementById("hero_btn");
    heroButon.innerText = "Ver Video";
    heroButon.setAttribute("data-fslightbox", "hero");
    heroButon.setAttribute("data-id", "hero_video_lightbox");
    heroButon.setAttribute("href", heroButon.getAttribute("data-href"));
    refreshFsLightbox();
    fsLightbox.props.type = "video";
    fsLightbox.props.autoplay = true;
}

activateLightbox();

fsLightbox.props.onOpen = function (instance) {
    autocloseVideo();
};

function autocloseVideo() {
    const lightboxVideo = document.getElementById("hero_video_lightbox");
    lightboxVideo.removeEventListener("ended", onEndVideo);
    lightboxVideo.addEventListener("ended", onEndVideo, false);
}
function onEndVideo(e) {
    console.log(e);
    fsLightbox.close();
}
