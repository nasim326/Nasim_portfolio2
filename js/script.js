// DOM Elements
const header = document.querySelector('.header');
const menuToggle = document.querySelector('.menu-toggle');
const navMobile = document.querySelector('.nav-mobile');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const currentYearEl = document.getElementById('current-year');

// Set current year in footer
currentYearEl.textContent = new Date().getFullYear();

// Header scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('menu-open');
  navMobile.classList.toggle('open');
  document.body.classList.toggle('no-scroll');
});

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('menu-open');
    navMobile.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    
    const headerHeight = header.offsetHeight;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    
    window.scrollTo({
      top: targetPosition - headerHeight,
      behavior: 'smooth'
    });
  });
});

// Form submission
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const formDataObj = Object.fromEntries(formData.entries());
    
    // Disable submit button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';
    
    try {
      // Simulate form submission with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      formStatus.textContent = 'Your message has been sent successfully!';
      formStatus.className = 'form-status success';
      
      // Reset form
      contactForm.reset();
    } catch (error) {
      // Show error message
      formStatus.textContent = 'There was an error sending your message. Please try again.';
      formStatus.className = 'form-status error';
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      
      // Clear status message after 5 seconds
      setTimeout(() => {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
      }, 5000);
    }
  });
}

// Scroll reveal animation
const revealElements = document.querySelectorAll('.section');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('revealed');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Check on initial load

// Add CSS for scroll reveal animation
const style = document.createElement('style');
style.textContent = `
  .section {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .section.revealed {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);


// script.js
const elements = document.querySelectorAll('.background-elements span');
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    elements.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed')) || 0.05;
        const moveX = (x * speed) - (window.innerWidth / 2 * speed);
        const moveY = (y * speed) - (window.innerHeight / 2 * speed);
        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});
