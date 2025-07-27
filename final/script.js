// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.innerHTML = navLinks.classList.contains('active') ? 
    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Sticky Header
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Testimonial Slider
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.nav-dot');
let currentTestimonial = 0;

function showTestimonial(index) {
  testimonials.forEach(testimonial => testimonial.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  testimonials[index].classList.add('active');
  dots[index].classList.add('active');
  currentTestimonial = index;
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => showTestimonial(index));
});

// Auto slide testimonials
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}, 5000);

// Flip Card Functionality
document.querySelectorAll('.flip-btn').forEach(button => {
  button.addEventListener('click', function(e) {
    e.stopPropagation();
    const card = this.closest('.service-card');
    card.classList.toggle('flipped');
  });
});

// Close card when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.service-card')) {
    document.querySelectorAll('.service-card.flipped').forEach(card => {
      card.classList.remove('flipped');
    });
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');

// Set initial theme
if (savedTheme) {
  document.body.classList.toggle('dark-mode', savedTheme === 'dark');
  updateThemeIcon();
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark-mode');
  updateThemeIcon();
}

// Toggle theme
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  updateThemeIcon();
});

// Update icon based on theme
function updateThemeIcon() {
  const isDarkMode = document.body.classList.contains('dark-mode');
  themeIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
}

// Pause video on mobile to save data
if (/Mobi|Android/i.test(navigator.userAgent)) {
  const video = document.querySelector('.video-background video');
  if (video) {
    video.pause();
    video.parentElement.style.display = 'none';
    document.querySelector('.hero').style.background = "linear-gradient(rgba(0,0,0,0.7), url('assets/images/hero-fallback.jpg') center/cover no-repeat";
  }
}

// Read more functionality
document.querySelectorAll('.read-more-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const card = this.closest('.founder-card');
    const text = card.querySelector('p');
    text.classList.toggle('truncated-text');
    
    if (text.classList.contains('truncated-text')) {
      this.textContent = 'Read More';
      text.style.webkitLineClamp = '3';
    } else {
      this.textContent = 'Read Less';
      text.style.webkitLineClamp = 'unset';
    }
  });
});

// Client card animation
const clientCards = document.querySelectorAll('.client-card');
    
// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
        }
    });
}, { threshold: 0.1 });

clientCards.forEach(card => {
    observer.observe(card);
});

// Client logo hover effect
clientCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.client-logo').style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('.client-logo').style.transform = 'scale(1)';
    });
});

// Load more button functionality
const loadMoreBtn = document.querySelector('.btn-load-more');
if (loadMoreBtn) {
  const hiddenClients = document.querySelectorAll('.client-card:nth-child(n+7)'); // First 6 are visible
  
  // Initially hide extra clients
  hiddenClients.forEach(client => {
      client.style.display = 'none';
  });
  
  loadMoreBtn.addEventListener('click', function() {
      hiddenClients.forEach(client => {
          client.style.display = 'block';
          setTimeout(() => {
              client.style.opacity = 1;
          }, 100);
      });
      
      this.style.display = 'none';
  });
}