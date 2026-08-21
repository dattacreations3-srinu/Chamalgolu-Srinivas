/* ==========================================
   SRINU PREMIUM PORTFOLIO
   JAVASCRIPT
========================================== */


/* ==========================================
   DEFAULT CONFIGURATION
========================================== */

const defaultConfig = {

    hero_name:
        'Chalamgolu Srinivas (Srinu)',

    hero_tagline:
        'Founder | IoT Innovator | Digital Creator | Business Mind',

    about_bio:
        'Founder of Datta Creations, IoT engineer, and digital innovator. I build modern websites, automation systems, and digital experiences. B.Tech student with a passion for technology, business collaboration, and creative problem-solving. Experienced in team leadership and turning ideas into reality.',

    datta_description:
        'Datta Creations is a creative digital brand focused on building modern websites, cinematic wedding invitations, and innovative digital experiences for forward-thinking clients and businesses.',

    contact_email:
        'your@email.com',

    contact_phone:
        '+91 XXXXX XXXXX',

    background_color:
        '#0a1628',

    surface_color:
        '#162544',

    text_color:
        '#e2e6ed',

    primary_action_color:
        '#d4a843',

    secondary_action_color:
        '#c0c7d4'
};


/* ==========================================
   CREATE SPARKLES
========================================== */

function createSparkles(container, count) {

    if (!container) {
        return;
    }

    for (let i = 0; i < count; i++) {

        const dot =
            document.createElement('div');

        dot.className =
            'sparkle-dot';

        dot.style.left =
            Math.random() * 100 + '%';

        dot.style.top =
            Math.random() * 100 + '%';

        dot.style.animationDelay =
            Math.random() * 3 + 's';

        dot.style.animationDuration =
            (2 + Math.random() * 2) + 's';

        container.appendChild(dot);
    }
}


/* Create 20 sparkle dots */

createSparkles(
    document.getElementById('hero-sparkles'),
    20
);


/* ==========================================
   INTERSECTION OBSERVER
   SCROLL ANIMATIONS
========================================== */

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        'visible'
                    );

                }

            });

        },
        {
            threshold: 0.1
        }
    );


document
    .querySelectorAll(
        '.fade-up, .slide-left, .slide-right'
    )
    .forEach((element) => {

        observer.observe(element);

    });


/* ==========================================
   MOBILE MENU
========================================== */

const mobileMenuButton =
    document.getElementById(
        'mobile-menu-btn'
    );

const mobileMenu =
    document.getElementById(
        'mobile-menu'
    );


if (mobileMenuButton && mobileMenu) {

    mobileMenuButton.addEventListener(
        'click',
        () => {

            mobileMenu.classList.toggle(
                'hidden'
            );

        }
    );

}


/* ==========================================
   MOBILE NAVIGATION
========================================== */

function mobileNavigate(sectionId) {

    scrollToSection(sectionId);

    if (mobileMenu) {

        mobileMenu.classList.add(
            'hidden'
        );

    }

}


/* ==========================================
   SMOOTH SCROLL
========================================== */

function scrollToSection(sectionId) {

    const section =
        document.getElementById(sectionId);

    if (section) {

        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

    }

    if (mobileMenu) {

        mobileMenu.classList.add(
            'hidden'
        );

    }

}


/* ==========================================
   OPEN EXTERNAL WEBSITE
========================================== */

function openExternal(url) {

    window.open(
        url,
        '_blank',
        'noopener,noreferrer'
    );

}


/* ==========================================
   IMAGE ERROR HANDLER
========================================== */

function handleImageError(image) {

    console.error(
        'Image failed to load:',
        image.src
    );

    image.style.background =
        '#162544';

    image.alt =
        'Profile photo unavailable';

}


/* ==========================================
   CONTACT FORM
========================================== */

const contactForm =
    document.getElementById(
        'contact-form'
    );


if (contactForm) {

    contactForm.addEventListener(
        'submit',
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById('c-name')
                    .value
                    .trim();


            const email =
                document
                    .getElementById('c-email')
                    .value
                    .trim();


            const phone =
                document
                    .getElementById('c-phone')
                    .value
                    .trim();


            const msg =
                document
                    .getElementById('c-msg')
                    .value
                    .trim();


            /*
             * Required fields:
             * Name
             * Email
             * Message
             */

            if (
                name &&
                email &&
                msg
            ) {

                const message =
                    `Name: ${encodeURIComponent(name)}%0A` +
                    `Email: ${encodeURIComponent(email)}%0A` +
                    `Phone: ${encodeURIComponent(phone)}%0A` +
                    `Message: ${encodeURIComponent(msg)}`;


                const whatsappUrl =
                    `https://wa.me/918367022341?text=${message}`;


                window.open(
                    whatsappUrl,
                    '_blank',
                    'noopener,noreferrer'
                );


                const successMessage =
                    document.getElementById(
                        'form-success'
                    );


                if (successMessage) {

                    successMessage.classList.remove(
                        'hidden'
                    );

                }


                contactForm.reset();


                setTimeout(
                    () => {

                        if (successMessage) {

                            successMessage.classList.add(
                                'hidden'
                            );

                        }

                    },
                    4000
                );

            }

        }
    );

}


/* ==========================================
   APPLY CONFIGURATION
========================================== */

function applyConfig(config) {

    const c = {
        ...defaultConfig,
        ...config
    };


    /* Hero name */

    const heroName =
        document.getElementById(
            'hero-name'
        );

    if (heroName) {

        heroName.textContent =
            c.hero_name;

    }


    /* Hero tagline */

    const heroTagline =
        document.getElementById(
            'hero-tagline'
        );

    if (heroTagline) {

        heroTagline.textContent =
            c.hero_tagline;

    }


    /* About biography */

    const aboutBio =
        document.getElementById(
            'about-bio'
        );

    if (aboutBio) {

        aboutBio.textContent =
            c.about_bio;

    }


    /* Datta description */

    const dattaDescription =
        document.getElementById(
            'datta-description'
        );

    if (dattaDescription) {

        dattaDescription.textContent =
            c.datta_description;

    }


    /* Contact email */

    const emailInput =
        document.getElementById(
            'c-email'
        );

    if (emailInput) {

        emailInput.placeholder =
            c.contact_email;

    }


    /* Contact phone */

    const phoneInput =
        document.getElementById(
            'c-phone'
        );

    if (phoneInput) {

        phoneInput.placeholder =
            c.contact_phone;

    }


    /* ======================================
       CSS VARIABLES
    ====================================== */

    document.documentElement.style
        .setProperty(
            '--navy',
            c.background_color
        );


    document.documentElement.style
        .setProperty(
            '--navy-mid',
            c.surface_color
        );


    document.documentElement.style
        .setProperty(
            '--gold',
            c.primary_action_color
        );


    document.documentElement.style
        .setProperty(
            '--silver',
            c.secondary_action_color
        );


    document.documentElement.style
        .setProperty(
            '--silver-light',
            c.text_color
        );

}


/* ==========================================
   INITIAL CONFIGURATION
========================================== */

applyConfig(defaultConfig);


/* ==========================================
   OPTIONAL CANVA ELEMENT SDK SUPPORT
========================================== */

/*
 * If this website is later placed back inside
 * Canva Code with elementSdk available, this
 * section can use the Canva configuration API.
 *
 * In normal VS Code / local hosting,
 * window.elementSdk does not exist, so nothing
 * happens here.
 */

if (window.elementSdk) {

    window.elementSdk.init({

        defaultConfig,

        onConfigChange:
            async (config) => {

                applyConfig(config);

            },


        mapToCapabilities:
            (config) => {

                const c = {
                    ...defaultConfig,
                    ...config
                };


                return {

                    recolorables: [

                        {
                            get: () =>
                                c.background_color,

                            set: (value) => {

                                config.background_color =
                                    value;

                                window.elementSdk
                                    .setConfig({
                                        background_color:
                                            value
                                    });

                            }
                        },


                        {
                            get: () =>
                                c.surface_color,

                            set: (value) => {

                                config.surface_color =
                                    value;

                                window.elementSdk
                                    .setConfig({
                                        surface_color:
                                            value
                                    });

                            }
                        },


                        {
                            get: () =>
                                c.text_color,

                            set: (value) => {

                                config.text_color =
                                    value;

                                window.elementSdk
                                    .setConfig({
                                        text_color:
                                            value
                                    });

                            }
                        },


                        {
                            get: () =>
                                c.primary_action_color,

                            set: (value) => {

                                config.primary_action_color =
                                    value;

                                window.elementSdk
                                    .setConfig({
                                        primary_action_color:
                                            value
                                    });

                            }
                        },


                        {
                            get: () =>
                                c.secondary_action_color,

                            set: (value) => {

                                config.secondary_action_color =
                                    value;

                                window.elementSdk
                                    .setConfig({
                                        secondary_action_color:
                                            value
                                    });

                            }
                        }

                    ],


                    borderables: [],


                    fontEditable: {

                        get: () =>
                            c.font_family ||
                            'Playfair Display',

                        set: (value) => {

                            config.font_family =
                                value;

                            window.elementSdk
                                .setConfig({
                                    font_family:
                                        value
                                });

                        }

                    },


                    fontSizeable: {

                        get: () =>
                            c.font_size ||
                            16,

                        set: (value) => {

                            config.font_size =
                                value;

                            window.elementSdk
                                .setConfig({
                                    font_size:
                                        value
                                });

                        }

                    }

                };

            },


        mapToEditPanelValues:
            (config) => {

                const c = {
                    ...defaultConfig,
                    ...config
                };


                return new Map([

                    [
                        'hero_name',
                        c.hero_name
                    ],

                    [
                        'hero_tagline',
                        c.hero_tagline
                    ],

                    [
                        'about_bio',
                        c.about_bio
                    ],

                    [
                        'datta_description',
                        c.datta_description
                    ],

                    [
                        'contact_email',
                        c.contact_email
                    ],

                    [
                        'contact_phone',
                        c.contact_phone
                    ]

                ]);

            }

    });

}


/* ==========================================
   LUCIDE ICON INITIALIZATION
========================================== */

if (
    typeof lucide !== 'undefined' &&
    lucide.createIcons
) {

    lucide.createIcons();

}


/* ==========================================
   NO URL PREVIEW
   BUTTON-BASED NAVIGATION
========================================== */

/*
 * Navigation is intentionally handled with
 * buttons and JavaScript instead of normal
 * <a href=""> navigation.
 *
 * This prevents normal anchor link status
 * previews from appearing inside the page.
 */