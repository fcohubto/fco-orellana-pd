const navbar = document.getElementById("navbar");
const sectionIds = ["about", "projects", "contact"];
const navLinks = document.querySelectorAll(".desktop-nav a[href^='#'], .mobile-menu a[href^='#']");
const desktopNavLinks = document.querySelectorAll(".desktop-nav a[href^='#']");
const mobileNavLinks = document.querySelectorAll(".mobile-menu a[href^='#']");
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

/* NAVBAR SHADOW */
function updateNavbarShadow() {
    if (!navbar) return;
    if (window.scrollY > 10) {
        navbar.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
    } else {
        navbar.style.boxShadow = "none";
    }
}
window.addEventListener("scroll", updateNavbarShadow, { passive: true });

/* SMOOTH SCROLL GLOBAL */
navLinks.forEach((link) => {
    link.addEventListener("click", function(e) {
        const targetId = this.getAttribute("href");
        if (!targetId || !targetId.startsWith("#")) return;
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        closeMobileMenu();
    });
});

/* ACTIVE SECTION IN MAIN NAV (Intersection Observer 1) */
const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
if (sections.length) {
    const mainObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const activeId = `#${entry.target.id}`;
            [...desktopNavLinks, ...mobileNavLinks].forEach((link) => {
                if (link.getAttribute("href") === activeId) {
                    link.setAttribute("aria-current", "page");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        });
    }, { rootMargin: "-40% 0px -45% 0px", threshold: 0.1 });
    sections.forEach((section) => mainObserver.observe(section));
}

/* THEME TOGGLE */
function applyTheme(theme) {
    const isDark = theme === "dark";
    document.body.classList.toggle("dark-mode", isDark);
    if (themeToggle) {
        themeToggle.setAttribute("aria-pressed", String(isDark));
        themeToggle.setAttribute("aria-label", isDark ? "Activar modo claro" : "Activar modo oscuro");
    }
    localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isDark = document.body.classList.contains("dark-mode");
        applyTheme(isDark ? "light" : "dark");
    });
}

/* CAROUSEL LOGIC */
const track = document.querySelector('.carousel-track');
const dots = document.querySelectorAll('.dot');
const nextBtn = document.querySelector('.nav-btn.next');
const prevBtn = document.querySelector('.nav-btn.prev');

if (track) {
    track.addEventListener('scroll', () => {
        const slide = track.querySelector('.flow-slide');
        if (!slide) return;
        const slideWidth = slide.offsetWidth + 24;
        const currentIndex = Math.round(track.scrollLeft / slideWidth);

        dots.forEach((dot, index) => {
            index === currentIndex ? dot.classList.add('active') : dot.classList.remove('active');
        });

        const maxScroll = track.scrollWidth - track.clientWidth;
        if (prevBtn) {
            prevBtn.style.opacity = track.scrollLeft <= 10 ? "0.2" : "1";
            prevBtn.style.pointerEvents = track.scrollLeft <= 10 ? "none" : "auto";
        }
        if (nextBtn) {
            nextBtn.style.opacity = track.scrollLeft >= maxScroll - 10 ? "0.2" : "1";
            nextBtn.style.pointerEvents = track.scrollLeft >= maxScroll - 10 ? "none" : "auto";
        }
    }, { passive: true });

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const slideWidth = track.querySelector('.flow-slide').offsetWidth + 24;
            track.scrollBy({ left: slideWidth, behavior: 'smooth' });
        });
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const slideWidth = track.querySelector('.flow-slide').offsetWidth + 24;
            track.scrollBy({ left: -slideWidth, behavior: 'smooth' });
        });
    }
}

/* MOBILE MENU */
function openMobileMenu() {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.classList.add("is-open");
    menuToggle.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
}

function closeMobileMenu() {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
}

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.contains("is-open");
        isOpen ? closeMobileMenu() : openMobileMenu();
    });
}

window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMobileMenu();
});

/* --- LOGICA STEPPER (OTRO PROYECTO) --- */
const stepperObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.stepper-item').forEach(item => item.classList.remove('active'));
            const id = entry.target.getAttribute('id');
            const targetItem = document.querySelector(`.stepper-item[href="#${id}"]`);
            if (targetItem) targetItem.classList.add('active');
        }
    });
}, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

document.querySelectorAll('article[id]').forEach((section) => stepperObserver.observe(section));

const stepperElement = document.querySelector('.project-stepper');
const caseStudyLayout = document.querySelector('.case-study-layout');
if (caseStudyLayout && stepperElement) {
    const visibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.isIntersecting ? stepperElement.classList.add('is-visible') : stepperElement.classList.remove('is-visible');
        });
    }, { rootMargin: "0% 0px -20% 0px", threshold: 0.01 });
    visibilityObserver.observe(caseStudyLayout);
}

/* --- LOGICA CASO DE ESTUDIO ACTUAL (PROGRESS NAV) --- */
document.addEventListener('DOMContentLoaded', () => {
    const progressLinks = document.querySelectorAll('.js-scroll-link');
    const caseSections = document.querySelectorAll('section[id^="cap"]');

    const setActiveStep = (id) => {
        progressLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
        });
    };

    progressLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const offset = 140;
                    window.scrollTo({
                        top: targetElement.offsetTop - offset,
                        behavior: 'smooth'
                    });
                    setActiveStep(targetId);
                }
            }
        });
    });

    if (caseSections.length) {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setActiveStep(entry.target.id);
            });
        }, { rootMargin: '-150px 0px -70% 0px', threshold: 0 });
        caseSections.forEach(section => progressObserver.observe(section));
    }
});
// --- Sensor de salida del Stepper ---
const stepperNav = document.querySelector('.project-progress-nav');
const footer = document.querySelector('footer'); // Elemento que activa el ocultamiento

const hideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Si el footer entra, aplicamos feedback visual de salida
            stepperNav.style.opacity = '0';
            stepperNav.style.pointerEvents = 'none';
            stepperNav.style.transform = 'translateY(-10px)'; // Efecto sutil de subida
        } else {
            stepperNav.style.opacity = '1';
            stepperNav.style.pointerEvents = 'all';
            stepperNav.style.transform = 'translateY(0)';
        }
    });
}, {
    // MODIFICA ESTE VALOR:
    // Al poner 200px, el componente se ocultará 200 píxeles ANTES 
    // de que el footer aparezca en pantalla.
    rootMargin: "0px 0px 200px 0px",
    threshold: 0
});

if (footer && stepperNav) hideObserver.observe(footer);