function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("active");
    toggleMenuButton();
}

function closeMenu() {
    const menu = document.getElementById("menu");
    menu.classList.remove("active");
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
