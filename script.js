// ========== SCROLL PROGRESS BAR, NAVBAR, BACK TO TOP ==========
const progressBar = document.querySelector('.progress-bar');
const navbar = document.querySelector('.navbar');
const backToTop = document.querySelector('.back-to-top');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    
    // Update progress bar
    const percent = (currentScrollY / total) * 100;
    progressBar.style.width = percent + '%';
    
    // Show/hide back to top button
    if (currentScrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Navbar hide on scroll down, show on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > 60) {
        navbar.classList.add('navbar-hidden');
    } else if (currentScrollY < lastScrollY || currentScrollY === 0) {
        navbar.classList.remove('navbar-hidden');
    }
    
    lastScrollY = currentScrollY;
});

// ========== BACK TO TOP CLICK EVENT ==========
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== SCROLL-TRIGGERED TEXT ANIMATIONS ==========
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
         }  

    });
}, {
    threshold: 0.1
});

fadeElements.forEach(el => observer.observe(el));

// ========== ACTIVE NAV LINK HIGHLIGHT ==========
const sections = document.querySelectorAll('.pimg1[id], .pimg2[id], .pimg3[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            if (!id) return;
            
            navLinks.forEach(link => link.classList.remove('active'));
            
            const activeLink = document.querySelector(`a[data-section="${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, {
    threshold: 0.5
});

sections.forEach(section => sectionObserver.observe(section));

// ========== HAMBURGER MENU ==========
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when any nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});