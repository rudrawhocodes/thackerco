const navToggle = document.querySelector('.navbar-toggle');
const navLinks = document.querySelector('.navbar-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
  });

  // Optional: Close nav when link is clicked (for better UX on mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
      }
    });
  });
}

// Smooth section fade-in on scroll
function revealOnScroll() {
  const reveals = document.querySelectorAll('.fade-in, .fade-in-up');
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const revealTop = el.getBoundingClientRect().top;
    if (revealTop < windowHeight * 0.88) {
      el.style.animationPlayState = 'running';
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Testimonials Carousel
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.carousel-dots .dot');
let carouselIndex = 0;
function showTestimonial(idx) {
  testimonials.forEach((el, i) => {
    el.classList.toggle('active', i === idx);
    dots[i].classList.toggle('active', i === idx);
  });
}
function nextTestimonial() {
  carouselIndex = (carouselIndex + 1) % testimonials.length;
  showTestimonial(carouselIndex);
}
dots.forEach((dot, idx) => {
  dot.addEventListener('click', () => {
    carouselIndex = idx;
    showTestimonial(carouselIndex);
  });
});
setInterval(nextTestimonial, 7000);

// Contact Form: (for demo, prevent submit and show feedback)
document.querySelector('.contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.disabled = true;
  btn.textContent = 'Submitted!';
  btn.style.background = '#e0cfa2';
  btn.style.color = '#0F1A24';
  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = 'Submit';
    btn.style.background = '';
    btn.style.color = '';
    e.target.reset();
  }, 3500);
});

// Parallax effect for hero background
window.addEventListener('mousemove', e => {
  const parallax = document.querySelector('.hero-parallax');
  if (!parallax) return;
  const x = (e.clientX / window.innerWidth) * 30 - 15;
  const y = (e.clientY / window.innerHeight) * 30 - 15;
  parallax.style.backgroundPosition = `${60 + x}% ${20 + y}%`;
});