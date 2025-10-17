// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        // Toggle mobile menu visibility
        if (navMenu.style.display === 'flex') {
            navMenu.style.display = 'none';
        } else {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'rgba(0, 0, 0, 0.98)';
            navMenu.style.padding = '2rem';
            navMenu.style.borderBottom = '2px solid var(--accent)';
        }

        // Animate hamburger
        hamburger.classList.toggle('active');
    });
}

// Mobile Dropdown Toggle
document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.dropdown');
    if (dropdown && window.innerWidth <= 768) {
        dropdown.addEventListener('click', function(e) {
            const dropdownMenu = this.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                e.stopPropagation();
                dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
                dropdownMenu.style.position = 'relative';
                dropdownMenu.style.marginTop = '0.5rem';
            }
        });
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Close mobile menu if open
            if (window.innerWidth <= 768 && navMenu) {
                navMenu.style.display = 'none';
                if (hamburger) {
                    hamburger.classList.remove('active');
                }
            }
        }
    });
});

// Contact Form Handling with Web3Forms
document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const submitButton = this.querySelector("button[type='submit']");
    const originalText = submitButton.textContent;

    try {
        submitButton.textContent = "Sending...";
        submitButton.disabled = true;

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(Object.fromEntries(formData))
        });

        const result = await response.json();

        if (result.success) {
            alert("Thank you for your message! We will get back to you soon.");
            this.reset();
        } else {
            alert("Failed to send message. Please try again.");
        }
    } catch (error) {
        alert("An error occurred. Please try again.");
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (navbar) {
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(198, 255, 0, 0.2)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(198, 255, 0, 0.1)';
        }
    }
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Observe service cards and features for animation
    const animateElements = document.querySelectorAll('.service-card, .feature, .stat');

    animateElements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Ensure nav menu is properly displayed on desktop
    if (window.innerWidth > 768 && navMenu) {
        navMenu.style.display = 'flex';
        navMenu.style.position = 'static';
        navMenu.style.flexDirection = 'row';
        navMenu.style.background = 'transparent';
        navMenu.style.padding = '0';
        navMenu.style.border = 'none';
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navMenu) {
        navMenu.style.display = 'flex';
        navMenu.style.position = 'static';
        navMenu.style.flexDirection = 'row';
        navMenu.style.background = 'transparent';
        navMenu.style.padding = '0';
        navMenu.style.border = 'none';
    } else if (navMenu) {
        navMenu.style.display = 'none';
    }
});

// Accessibility Features
const accessibilityToggle = document.getElementById('accessibilityToggle');
const accessibilityOptions = document.getElementById('accessibilityOptions');

// Toggle accessibility menu visibility
if (accessibilityToggle && accessibilityOptions) {
    accessibilityToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const isVisible = accessibilityOptions.style.display === 'block';
        accessibilityOptions.style.display = isVisible ? 'none' : 'block';
    });

    // Prevent menu from closing when clicking inside it
    accessibilityOptions.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.accessibility-menu')) {
            accessibilityOptions.style.display = 'none';
        }
    });
}

// Accessibility preferences
const accessibilityFeatures = {
    highContrast: false,
    reduceMotion: false,
    largerText: false,
    grayscale: false
};

// High Contrast Mode
document.getElementById('highContrast')?.addEventListener('click', function() {
    document.body.classList.toggle('high-contrast');
    this.classList.toggle('active');
    accessibilityFeatures.highContrast = !accessibilityFeatures.highContrast;
    localStorage.setItem('accessibility', JSON.stringify(accessibilityFeatures));
});

// Reduce Motion
document.getElementById('reduceMotion')?.addEventListener('click', function() {
    document.body.classList.toggle('reduce-motion');
    this.classList.toggle('active');
    accessibilityFeatures.reduceMotion = !accessibilityFeatures.reduceMotion;
    localStorage.setItem('accessibility', JSON.stringify(accessibilityFeatures));
});

// Larger Text
document.getElementById('largerText')?.addEventListener('click', function() {
    document.body.classList.toggle('larger-text');
    this.classList.toggle('active');
    accessibilityFeatures.largerText = !accessibilityFeatures.largerText;
    localStorage.setItem('accessibility', JSON.stringify(accessibilityFeatures));
});

// Grayscale Mode
document.getElementById('grayscale')?.addEventListener('click', function() {
    document.body.classList.toggle('grayscale-mode');
    this.classList.toggle('active');
    accessibilityFeatures.grayscale = !accessibilityFeatures.grayscale;
    localStorage.setItem('accessibility', JSON.stringify(accessibilityFeatures));
});

// Load saved accessibility preferences on page load
window.addEventListener('load', function() {
    const saved = JSON.parse(localStorage.getItem('accessibility') || '{}');
    
    if (saved.highContrast) {
        document.body.classList.add('high-contrast');
        document.getElementById('highContrast')?.classList.add('active');
        accessibilityFeatures.highContrast = true;
    }
    
    if (saved.reduceMotion) {
        document.body.classList.add('reduce-motion');
        document.getElementById('reduceMotion')?.classList.add('active');
        accessibilityFeatures.reduceMotion = true;
    }
    
    if (saved.largerText) {
        document.body.classList.add('larger-text');
        document.getElementById('largerText')?.classList.add('active');
        accessibilityFeatures.largerText = true;
    }
    
    if (saved.grayscale) {
        document.body.classList.add('grayscale-mode');
        document.getElementById('grayscale')?.classList.add('active');
        accessibilityFeatures.grayscale = true;
    }
});
