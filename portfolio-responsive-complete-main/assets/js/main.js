/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '30px',
    duration: 1000,
    delay: 200,
    reset: false,
    mobile: true
});

// Animate work experience items on scroll
const animateWorkExperience = () => {
    const workItems = document.querySelectorAll('.work__experience');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on index
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 150 * index);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    workItems.forEach(item => {
        observer.observe(item);
    });
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Animate work experience items
    animateWorkExperience();
    
    // Add hover effect to work experience items
    const workItems = document.querySelectorAll('.work__experience');
    workItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Reveal other elements
sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {
    origin: 'left',
    distance: '50px'
});

sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', {
    origin: 'right',
    distance: '50px',
    delay: 200
});

sr.reveal('.home__social-icon', {
    interval: 150,
    origin: 'bottom',
    distance: '30px'
});

sr.reveal('.skills__data, .contact__input', {
    interval: 150,
    origin: 'bottom',
    distance: '20px'
});

// Animate work experience items when they come into view
const workObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            workObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.work__experience').forEach(item => {
    workObserver.observe(item);
});
