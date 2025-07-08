// Marathon Website JavaScript

// Import AOS library
const AOS = window.AOS;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.3)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Registration button click handler
    const registerBtn = document.querySelector('.btn-register');
    if (registerBtn) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>جاري التحميل...';
            this.disabled = true;
            
            // Simulate registration process
            setTimeout(() => {
                // Show success animation
                this.innerHTML = '<i class="fas fa-check me-2"></i>تم التسجيل بنجاح!';
                this.style.backgroundColor = '#28a745';
                
                // Show notification
                showNotification('تم التسجيل بنجاح! سنتواصل معك قريباً.', 'success');
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                    this.style.backgroundColor = 'var(--primary-orange)';
                }, 3000);
            }, 2000);
        });
    }

    // Race card details button handlers
    const detailsBtns = document.querySelectorAll('.btn-details');
    detailsBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const raceCard = this.closest('.race-card');
            const raceTitle = raceCard.querySelector('.race-title').textContent;
            const originalText = this.innerHTML;
            
            // Add loading state
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>جاري التحميل...';
            this.disabled = true;
            
            setTimeout(() => {
                showNotification(`سيتم توفير تفاصيل سباق ${raceTitle} قريباً`, 'info');
                
                // Reset button
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1500);
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        const rate = scrolled * -0.3;
        
        if (heroImage && scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });

    // Smooth reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.section-title, .about-content, .race-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Race cards hover effects
    const raceCards = document.querySelectorAll('.race-card');
    raceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Counter animation for race dates
    function animateCounters() {
        const counters = document.querySelectorAll('.race-date .number');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            let current = 0;
            const increment = target / 30;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            // Start animation when element is visible
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        counterObserver.unobserve(entry.target);
                    }
                });
            });
            
            counterObserver.observe(counter);
        });
    }

    // Initialize counter animation
    animateCounters();

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.custom-notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `custom-notification position-fixed`;
        notification.style.cssText = `
            top: 30px;
            right: 30px;
            z-index: 9999;
            min-width: 350px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            padding: 20px 25px;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
            font-weight: 600;
            font-size: 1.1rem;
            animation: slideInRight 0.4s ease;
            backdrop-filter: blur(10px);
        `;
        
        notification.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-3" style="font-size: 1.3rem;"></i>
                <span>${message}</span>
                <button type="button" class="btn-close btn-close-white ms-auto" onclick="this.parentElement.parentElement.remove()" style="font-size: 0.8rem;"></button>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.4s ease';
                setTimeout(() => notification.remove(), 400);
            }
        }, 5000);
    }

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
    `;
    document.head.appendChild(style);

    // Loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.filter = this.style.filter + ' blur(0px)';
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            console.warn('Image failed to load:', this.src);
        });
        
        // Initial state
        img.style.opacity = '0';
        img.style.filter = img.style.filter + ' blur(5px)';
        img.style.transition = 'all 0.3s ease';
    });

    // Performance optimization: Reduce animations on mobile
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        // Disable parallax on mobile for better performance
        window.removeEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroImage = document.querySelector('.hero-image');
            const rate = scrolled * -0.3;
            
            if (heroImage && scrolled < window.innerHeight) {
                heroImage.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Console welcome message
    console.log('%c🏃‍♂️ مرحباً بك في ماراثون معالم', 'color: #db6918; font-size: 24px; font-weight: bold;');
    console.log('%cتم تطوير الموقع باستخدام أحدث التقنيات', 'color: #429947; font-size: 16px;');
    
    // Make showNotification globally available
    window.showNotification = showNotification;
});

// Utility functions
const MarathonUtils = {
    // Format Arabic numbers
    formatArabicNumber: function(number) {
        const arabicNumbers = '٠١٢٣٤٥٦٧٨٩';
        return number.toString().replace(/[0-9]/g, function(w) {
            return arabicNumbers[+w];
        });
    },

    // Validate Arabic text
    isArabic: function(text) {
        const arabicRegex = /[\u0600-\u06FF]/;
        return arabicRegex.test(text);
    },

    // Smooth scroll to element
    scrollToElement: function(elementId, offset = 100) {
        const element = document.getElementById(elementId);
        if (element) {
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    },

    // Get current Arabic date
    getArabicDate: function() {
        const date = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            calendar: 'islamic'
        };
        return date.toLocaleDateString('ar-SA', options);
    }
};

// Export utils for global access
window.MarathonUtils = MarathonUtils;