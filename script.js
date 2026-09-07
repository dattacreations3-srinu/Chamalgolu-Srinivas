/* =========================================================
   SRINU PORTFOLIO
   Vanilla JavaScript
   ========================================================= */


/* =========================================================
   GLOBAL SETTINGS
========================================================= */

"use strict";


const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


const isTouchDevice =
    window.matchMedia(
        "(pointer: coarse)"
    ).matches;


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initIcons();

    initLoader();

    initNavbar();

    initMobileMenu();

    initScrollProgress();

    initCustomCursor();

    initMouseGlow();

    initProfessionRotation();

    initRevealAnimations();

    initCounters();

    initCardTilt();

    initMagneticButtons();

    initParallax();

    initParticles();

    initVideoControls();

    initTimelineProgress();

    initActiveNavigation();

    initContactForm();

    initBackToTop();

    initSmoothLinks();

});


/* =========================================================
   LUCIDE ICONS
========================================================= */

function initIcons() {

    if (typeof lucide !== "undefined") {

        lucide.createIcons();

    }

}


/* =========================================================
   LOADING SCREEN
========================================================= */

function initLoader() {

    const loader =
        document.getElementById("loader");

    const percentage =
        document.getElementById("loaderPercentage");

    const line =
        document.querySelector(".loader-line span");


    if (!loader || !percentage || !line) {
        return;
    }


    if (prefersReducedMotion) {

        percentage.textContent = "100%";

        line.style.width = "100%";

        setTimeout(() => {

            loader.classList.add("loaded");

        }, 300);

        return;
    }


    let progress = 0;


    const interval =
        setInterval(() => {

            progress +=
                Math.floor(
                    Math.random() * 8
                ) + 2;


            if (progress >= 100) {

                progress = 100;

                clearInterval(interval);

            }


            percentage.textContent =
                `${progress}%`;

            line.style.width =
                `${progress}%`;


            if (progress >= 100) {

                setTimeout(() => {

                    loader.classList.add("loaded");

                }, 500);

            }

        }, 90);

}


/* =========================================================
   NAVBAR
========================================================= */

function initNavbar() {

    const header =
        document.getElementById("siteHeader");


    if (!header) {
        return;
    }


    const updateHeader =
        () => {

            if (window.scrollY > 50) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
                    "scrolled"
                );

            }

        };


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const toggle =
        document.getElementById("menuToggle");

    const close =
        document.getElementById("menuClose");

    const menu =
        document.getElementById("mobileMenu");

    const links =
        document.querySelectorAll(
            ".mobile-link"
        );


    if (!toggle || !menu) {
        return;
    }


    function openMenu() {

        toggle.classList.add("active");

        menu.classList.add("open");

        document.body.classList.add(
            "menu-open"
        );

        toggle.setAttribute(
            "aria-expanded",
            "true"
        );

        toggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

    }


    function closeMenu() {

        toggle.classList.remove("active");

        menu.classList.remove("open");

        document.body.classList.remove(
            "menu-open"
        );

        toggle.setAttribute(
            "aria-expanded",
            "false"
        );

        toggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    }


    toggle.addEventListener(
        "click",
        () => {

            const isOpen =
                menu.classList.contains("open");


            if (isOpen) {

                closeMenu();

            } else {

                openMenu();

            }

        }
    );


    if (close) {

        close.addEventListener(
            "click",
            closeMenu
        );

    }


    links.forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                menu.classList.contains("open")
            ) {

                closeMenu();

            }

        }
    );

}


/* =========================================================
   SCROLL PROGRESS
========================================================= */

function initScrollProgress() {

    const progress =
        document.querySelector(
            ".scroll-progress span"
        );


    if (!progress) {
        return;
    }


    const update =
        () => {

            const scrollTop =
                window.scrollY;

            const documentHeight =
                document.documentElement
                    .scrollHeight -
                window.innerHeight;


            const percentage =
                documentHeight > 0
                    ? (scrollTop / documentHeight) * 100
                    : 0;


            progress.style.width =
                `${percentage}%`;

        };


    window.addEventListener(
        "scroll",
        update,
        {
            passive: true
        }
    );


    update();

}


/* =========================================================
   CUSTOM CURSOR
========================================================= */

function initCustomCursor() {

    if (
        isTouchDevice ||
        prefersReducedMotion
    ) {
        return;
    }


    const dot =
        document.querySelector(
            ".cursor-dot"
        );

    const ring =
        document.querySelector(
            ".cursor-ring"
        );


    if (!dot || !ring) {
        return;
    }


    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;


            dot.style.left =
                `${mouseX}px`;

            dot.style.top =
                `${mouseY}px`;

        }
    );


    function animateRing() {

        ringX +=
            (mouseX - ringX) * 0.15;

        ringY +=
            (mouseY - ringY) * 0.15;


        ring.style.left =
            `${ringX}px`;

        ring.style.top =
            `${ringY}px`;


        requestAnimationFrame(
            animateRing
        );

    }


    animateRing();


    const interactiveElements =
        document.querySelectorAll(
            "a, button, input, textarea, select, .project-card, .skill-card, .social-card"
        );


    interactiveElements.forEach(
        element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    ring.classList.add(
                        "active"
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    ring.classList.remove(
                        "active"
                    );

                }
            );

        }
    );

}


/* =========================================================
   MOUSE FOLLOW GLOW
========================================================= */

function initMouseGlow() {

    if (
        isTouchDevice ||
        prefersReducedMotion
    ) {
        return;
    }


    const glow =
        document.querySelector(
            ".mouse-glow"
        );


    if (!glow) {
        return;
    }


    let targetX =
        window.innerWidth / 2;

    let targetY =
        window.innerHeight / 2;

    let currentX = targetX;
    let currentY = targetY;


    document.addEventListener(
        "mousemove",
        event => {

            targetX = event.clientX;
            targetY = event.clientY;

        }
    );


    function animateGlow() {

        currentX +=
            (targetX - currentX) * 0.08;

        currentY +=
            (targetY - currentY) * 0.08;


        glow.style.left =
            `${currentX}px`;

        glow.style.top =
            `${currentY}px`;


        requestAnimationFrame(
            animateGlow
        );

    }


    animateGlow();

}


/* =========================================================
   PROFESSION ROTATION / TYPEWRITER
========================================================= */

function initProfessionRotation() {

    const element =
        document.getElementById(
            "professionText"
        );


    if (!element) {
        return;
    }


    const professions = [

        "Founder of Datta Creations",
        "IoT Engineer",
        "Website Developer",
        "Digital Innovator",
        "Digital Marketer",
        "Creative Technologist",
        "B.Tech Student",
        "Team Leader"

    ];


    if (prefersReducedMotion) {

        element.textContent =
            professions[0];

        return;

    }


    let professionIndex = 0;

    let characterIndex = 0;

    let deleting = false;


    function type() {

        const current =
            professions[
                professionIndex
            ];


        if (!deleting) {

            characterIndex++;

            element.textContent =
                current.substring(
                    0,
                    characterIndex
                );


            if (
                characterIndex >=
                current.length
            ) {

                deleting = true;

                setTimeout(
                    type,
                    1600
                );

                return;

            }

            setTimeout(
                type,
                55
            );

        } else {

            characterIndex--;

            element.textContent =
                current.substring(
                    0,
                    characterIndex
                );


            if (
                characterIndex <= 0
            ) {

                deleting = false;

                professionIndex =
                    (
                        professionIndex + 1
                    ) %
                    professions.length;

                setTimeout(
                    type,
                    350
                );

                return;

            }

            setTimeout(
                type,
                30
            );

        }

    }


    type();

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initRevealAnimations() {

    const elements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right, .reveal-scale"
        );


    if (!elements.length) {
        return;
    }


    if (
        prefersReducedMotion
    ) {

        elements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -60px 0px"
            }
        );


    elements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

}


/* =========================================================
   COUNTERS
========================================================= */

function initCounters() {

    const counters =
        document.querySelectorAll(
            ".counter"
        );


    if (!counters.length) {
        return;
    }


    if (prefersReducedMotion) {

        counters.forEach(
            counter => {

                counter.textContent =
                    counter.dataset.target;

            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const counter =
                            entry.target;


                        const target =
                            Number(
                                counter.dataset.target
                            );


                        let current = 0;


                        const duration =
                            1200;


                        const start =
                            performance.now();


                        function animate(
                            timestamp
                        ) {

                            const progress =
                                Math.min(
                                    (
                                        timestamp -
                                        start
                                    ) /
                                    duration,
                                    1
                                );


                            const eased =
                                1 -
                                Math.pow(
                                    1 - progress,
                                    3
                                );


                            current =
                                Math.floor(
                                    eased * target
                                );


                            counter.textContent =
                                current;


                            if (
                                progress < 1
                            ) {

                                requestAnimationFrame(
                                    animate
                                );

                            } else {

                                counter.textContent =
                                    target;

                            }

                        }


                        requestAnimationFrame(
                            animate
                        );


                        observer.unobserve(
                            counter
                        );

                    }
                );

            },
            {
                threshold: .7
            }
        );


    counters.forEach(
        counter => {

            observer.observe(
                counter
            );

        }
    );

}


/* =========================================================
   3D CARD TILT
========================================================= */

function initCardTilt() {

    if (
        isTouchDevice ||
        prefersReducedMotion
    ) {
        return;
    }


    const cards =
        document.querySelectorAll(
            ".tilt-card"
        );


    cards.forEach(
        card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateY =
                        (
                            x - centerX
                        ) /
                        centerX *
                        4;


                    const rotateX =
                        -(
                            y - centerY
                        ) /
                        centerY *
                        4;


                    card.style.transform =
                        `
                        perspective(1200px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-5px)
                        `;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        }
    );

}


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

function initMagneticButtons() {

    if (
        isTouchDevice ||
        prefersReducedMotion
    ) {
        return;
    }


    const elements =
        document.querySelectorAll(
            ".magnetic"
        );


    elements.forEach(
        element => {

            element.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        element.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;


                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;


                    element.style.transform =
                        `
                        translate(
                            ${x * .12}px,
                            ${y * .12}px
                        )
                        `;

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    element.style.transform =
                        "";

                }
            );

        }
    );

}


/* =========================================================
   PARALLAX
========================================================= */

function initParallax() {

    if (
        isTouchDevice ||
        prefersReducedMotion
    ) {
        return;
    }


    const backgroundText =
        document.querySelector(
            ".hero-background-text"
        );


    const philosophyBg =
        document.querySelector(
            ".philosophy-bg"
        );


    let ticking = false;


    function updateParallax() {

        const scroll =
            window.scrollY;


        if (backgroundText) {

            backgroundText.style.transform =
                `
                translate3d(
                    ${scroll * -.015}px,
                    ${scroll * .12}px,
                    0
                )
                rotate(-3deg)
                `;

        }


        if (philosophyBg) {

            const rect =
                philosophyBg.parentElement
                    .getBoundingClientRect();


            const offset =
                (
                    window.innerHeight / 2 -
                    rect.top
                ) * .05;


            philosophyBg.style.transform =
                `
                translate3d(
                    ${offset}px,
                    0,
                    0
                )
                rotate(-8deg)
                `;

        }


        ticking = false;

    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                requestAnimationFrame(
                    updateParallax
                );

                ticking = true;

            }

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   PARTICLES
========================================================= */

function initParticles() {

    const container =
        document.getElementById(
            "particles"
        );


    if (
        !container ||
        prefersReducedMotion
    ) {
        return;
    }


    let count = 45;


    if (isTouchDevice) {
        count = 18;
    }


    const fragment =
        document.createDocumentFragment();


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "particle";


        particle.style.left =
            `${Math.random() * 100}%`;


        particle.style.top =
            `${Math.random() * 100}%`;


        particle.style.animationDuration =
            `${6 + Math.random() * 10}s`;


        particle.style.animationDelay =
            `${Math.random() * -10}s`;


        particle.style.setProperty(
            "--move-x",
            `${(Math.random() - .5) * 150}px`
        );


        fragment.appendChild(
            particle
        );

    }


    container.appendChild(
        fragment
    );

}


/* =========================================================
   VIDEO CONTROLS
========================================================= */

function initVideoControls() {

    const video =
        document.getElementById(
            "iotVideo"
        );

    const button =
        document.getElementById(
            "videoToggle"
        );


    if (!video || !button) {
        return;
    }


    button.addEventListener(
        "click",
        () => {

            if (video.paused) {

                video.play()
                    .catch(() => {});

                button.innerHTML =
                    `<i data-lucide="pause"></i>`;

                button.setAttribute(
                    "aria-label",
                    "Pause video"
                );

            } else {

                video.pause();

                button.innerHTML =
                    `<i data-lucide="play"></i>`;

                button.setAttribute(
                    "aria-label",
                    "Play video"
                );

            }


            initIcons();

        }
    );


    video.addEventListener(
        "play",
        () => {

            button.innerHTML =
                `<i data-lucide="pause"></i>`;

            button.setAttribute(
                "aria-label",
                "Pause video"
            );

            initIcons();

        }
    );


    video.addEventListener(
        "pause",
        () => {

            button.innerHTML =
                `<i data-lucide="play"></i>`;

            button.setAttribute(
                "aria-label",
                "Play video"
            );

            initIcons();

        }
    );


    /* Try autoplay */

    if (!video.paused) {
        video.play().catch(() => {});
    }

}


/* =========================================================
   TIMELINE SCROLL PROGRESS
========================================================= */

function initTimelineProgress() {

    const timeline =
        document.querySelector(
            ".timeline"
        );

    const progress =
        document.querySelector(
            ".timeline-progress span"
        );


    if (!timeline || !progress) {
        return;
    }


    if (prefersReducedMotion) {

        progress.style.height =
            "100%";

        return;

    }


    function updateTimeline() {

        const rect =
            timeline.getBoundingClientRect();


        const viewportCenter =
            window.innerHeight * .65;


        const start =
            rect.top;


        const end =
            rect.bottom;


        const total =
            end - start;


        const current =
            viewportCenter - start;


        let percentage =
            (
                current / total
            ) * 100;


        percentage =
            Math.max(
                0,
                Math.min(
                    100,
                    percentage
                )
            );


        progress.style.height =
            `${percentage}%`;

    }


    window.addEventListener(
        "scroll",
        updateTimeline,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        updateTimeline
    );


    updateTimeline();

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const links =
        document.querySelectorAll(
            ".nav-link"
        );


    const mobileLinks =
        document.querySelectorAll(
            ".mobile-link"
        );


    if (
        !sections.length
    ) {
        return;
    }


    const allLinks = [
        ...links,
        ...mobileLinks
    ];


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const id =
                            entry.target.id;


                        links.forEach(
                            link => {

                                link.classList.toggle(
                                    "active",
                                    link.getAttribute(
                                        "href"
                                    ) ===
                                    `#${id}`
                                );

                            }
                        );


                        allLinks.forEach(
                            link => {

                                if (
                                    link.classList.contains(
                                        "mobile-link"
                                    )
                                ) {

                                    link.classList.toggle(
                                        "active",
                                        link.getAttribute(
                                            "href"
                                        ) ===
                                        `#${id}`
                                    );

                                }

                            }
                        );

                    }
                );

            },
            {
                threshold: .25,
                rootMargin:
                    "-20% 0px -55% 0px"
            }
        );


    sections.forEach(
        section => {

            observer.observe(
                section
            );

        }
    );

}


/* =========================================================
   CONTACT FORM → WHATSAPP
========================================================= */

function initContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "contactName"
                ).value.trim();


            const email =
                document.getElementById(
                    "contactEmail"
                ).value.trim();


            const phone =
                document.getElementById(
                    "contactPhone"
                ).value.trim();


            const purpose =
                document.getElementById(
                    "contactPurpose"
                ).value;


            const message =
                document.getElementById(
                    "contactMessage"
                ).value.trim();


            if (
                !name ||
                !email ||
                !purpose ||
                !message
            ) {

                alert(
                    "Please fill in all required fields."
                );

                return;

            }


            const whatsappMessage =
                `Hi Srinu,

I visited your portfolio and would like to connect with you.

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Purpose: ${purpose}

Message:
${message}`;


            const whatsappURL =
                `https://wa.me/918367022341?text=${encodeURIComponent(
                    whatsappMessage
                )}`;


            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initBackToTop() {

    const button =
        document.getElementById(
            "backTop"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth"

            });

        }
    );

}


/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

function initSmoothLinks() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const targetID =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetID ||
                        targetID === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetID
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const header =
                        document.querySelector(
                            ".site-header"
                        );


                    const headerHeight =
                        header
                            ? header.offsetHeight + 15
                            : 0;


                    const top =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight;


                    window.scrollTo({

                        top,

                        behavior:
                            prefersReducedMotion
                                ? "auto"
                                : "smooth"

                    });

                }
            );

        }
    );

}


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /* Home key */

        if (
            event.key === "Home" &&
            !isTypingInField()
        ) {

            window.scrollTo({

                top: 0,

                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth"

            });

        }


        /* Escape */

        if (
            event.key === "Escape"
        ) {

            const menu =
                document.getElementById(
                    "mobileMenu"
                );


            const toggle =
                document.getElementById(
                    "menuToggle"
                );


            if (
                menu &&
                menu.classList.contains(
                    "open"
                )
            ) {

                menu.classList.remove(
                    "open"
                );

                document.body.classList.remove(
                    "menu-open"
                );

                toggle?.classList.remove(
                    "active"
                );

                toggle?.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    }
);


/* =========================================================
   CHECK INPUT FOCUS
========================================================= */

function isTypingInField() {

    const active =
        document.activeElement;


    if (!active) {
        return false;
    }


    const tag =
        active.tagName.toLowerCase();


    return (
        tag === "input" ||
        tag === "textarea" ||
        tag === "select"
    );

}


/* =========================================================
   WINDOW RESIZE OPTIMIZATION
========================================================= */

let resizeTimer;


window.addEventListener(
    "resize",
    () => {

        clearTimeout(
            resizeTimer
        );


        resizeTimer =
            setTimeout(
                () => {

                    initIcons();

                },
                150
            );

    }
);


/* =========================================================
   PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        const video =
            document.getElementById(
                "iotVideo"
            );


        if (!video) {
            return;
        }


        if (
            document.hidden
        ) {

            video.pause();

        } else {

            if (
                video.hasAttribute(
                    "autoplay"
                )
            ) {

                video.play()
                    .catch(() => {});

            }

        }

    }
);


/* =========================================================
   FINAL INITIALIZATION
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );


        initIcons();

    }
);