// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeLoading();
    initializeNavigation();
    initializeHeroSlider();
    initializeServiceTabs();
    initializeTestimonials();
    initializeAnimations();
    initializeCounters();
    initializeForms();
    initializeMobileMenu();
    initializeScrollEffects();
});

// Loading Screen
function initializeLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    // Simulate loading time
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 500);
    }, 1500);
}

// Navigation Functions
function initializeNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Header background change on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });
}

// Hero Slider
function initializeHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });
    
    // Pause on hover
    const hero = document.querySelector('.hero');
    hero.addEventListener('mouseenter', stopAutoSlide);
    hero.addEventListener('mouseleave', startAutoSlide);
    
    // Start auto-slide
    startAutoSlide();
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        }
    });
}

// Service Tabs
function initializeServiceTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Add animation effect
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Testimonials Slider
function initializeTestimonials() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentSlide = 0;
    let testimonialInterval;
    
    function showTestimonial(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextTestimonial() {
        currentSlide = (currentSlide + 1) % slides.length;
        showTestimonial(currentSlide);
    }
    
    function prevTestimonial() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showTestimonial(currentSlide);
    }
    
    function startAutoTestimonial() {
        testimonialInterval = setInterval(nextTestimonial, 6000);
    }
    
    function stopAutoTestimonial() {
        clearInterval(testimonialInterval);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextTestimonial();
        stopAutoTestimonial();
        startAutoTestimonial();
    });
    
    prevBtn.addEventListener('click', () => {
        prevTestimonial();
        stopAutoTestimonial();
        startAutoTestimonial();
    });
    
    // Start auto-slide
    startAutoTestimonial();
    
    // Pause on hover
    const testimonialSection = document.querySelector('.testimonials');
    testimonialSection.addEventListener('mouseenter', stopAutoTestimonial);
    testimonialSection.addEventListener('mouseleave', startAutoTestimonial);
}

// Scroll Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation for stat numbers
                if (entry.target.classList.contains('hero-stat') || entry.target.classList.contains('stat-item')) {
                    const numbers = entry.target.querySelectorAll('.stat-number');
                    numbers.forEach(animateCounter);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .hero-stat, .stat-item').forEach(el => {
        observer.observe(el);
    });
}

// Counter Animation
function initializeCounters() {
    // This will be triggered by the intersection observer
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const steps = 50;
    const stepDuration = duration / steps;
    const stepSize = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += stepSize;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, stepDuration);
}

// Form Handling
function initializeForms() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add loading state
        submitBtn.classList.add('btn-loading');
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Remove loading state
            submitBtn.classList.remove('btn-loading');
            submitBtn.disabled = false;
            
            // Show success message
            showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');
            
            // Reset form
            contactForm.reset();
        }, 2000);
    });
    
    // Real-time form validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error
    clearFieldError(e);
    
    // Validation rules
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    if (field.type === 'tel' && value && !isValidPhone(value)) {
        showFieldError(field, 'Please enter a valid phone number');
        return false;
    }
    
    return true;
}

function showFieldError(field, message) {
    const formGroup = field.parentElement;
    const existingError = formGroup.querySelector('.field-error');
    
    if (!existingError) {
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.color = '#ff6b6b';
        errorElement.style.fontSize = '0.85rem';
        errorElement.style.marginTop = '0.25rem';
        formGroup.appendChild(errorElement);
    }
    
    field.style.borderColor = '#ff6b6b';
}

function clearFieldError(e) {
    const field = e.target;
    const formGroup = field.parentElement;
    const existingError = formGroup.querySelector('.field-error');
    
    if (existingError) {
        existingError.remove();
    }
    
    field.style.borderColor = '';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    
    mobileMenuBtn.addEventListener('click', openMobileMenu);
    closeMobileMenu.addEventListener('click', closeMobileMenuHandler);
    mobileMenuOverlay.addEventListener('click', (e) => {
        if (e.target === mobileMenuOverlay) {
            closeMobileMenuHandler();
        }
    });
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenuHandler);
    });
}

function openMobileMenu() {
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function closeMobileMenuHandler() {
    closeMobileMenu();
}

// Scroll Effects
function initializeScrollEffects() {
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && scrolled < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Service Card Interactions
function initializeServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card.interactive');
    
    serviceCards.forEach(card => {
        const serviceBtn = card.querySelector('.service-btn');
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(-10px) scale(1)';
        });
        
        serviceBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const service = card.getAttribute('data-service');
            showServiceModal(service);
        });
        
        // Add ripple effect
        card.addEventListener('click', (e) => {
            createRipple(e, card);
        });
    });
}

// Ripple Effect
function createRipple(event, element) {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation CSS
const rippleCSS = `
@keyframes rippleEffect {
    to {
        transform: scale(2);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Service Modal (Popup)
function showServiceModal(service) {
    const serviceData = {
        maintenance: {
            title: 'General Maintenance Services',
            description: 'Complete facility maintenance solutions to keep your operations running smoothly.',
            features: ['HVAC System Maintenance', 'Electrical Repairs', 'Plumbing Services', 'Equipment Servicing', 'Preventive Maintenance'],
            image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        cleaning: {
            title: 'Professional Cleaning Services',
            description: 'Maintain a clean, healthy environment with our comprehensive cleaning solutions.',
            features: ['Daily Janitorial Services', 'Deep Cleaning Programs', 'Sanitization Protocols', 'Floor Care', 'Window Cleaning'],
            image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        electrical: {
            title: 'Expert Electrical Services',
            description: 'Professional electrical maintenance and installation by certified electricians.',
            features: ['Electrical Repairs', 'System Upgrades', 'Safety Inspections', 'Emergency Electrical', 'Lighting Solutions'],
            image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        security: {
            title: 'Comprehensive Security Solutions',
            description: 'Protect your facility with advanced security systems and professional monitoring.',
            features: ['24/7 Monitoring', 'Access Control Systems', 'CCTV Installation', 'Security Patrols', 'Alarm Systems'],
            image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        landscaping: {
            title: 'Professional Landscaping',
            description: 'Create beautiful, well-maintained grounds that enhance your facility\'s appearance.',
            features: ['Lawn Maintenance', 'Tree & Shrub Care', 'Seasonal Planting', 'Irrigation Systems', 'Landscape Design'],
            image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        emergency: {
            title: '24/7 Emergency Services',
            description: 'Rapid response emergency services to minimize downtime and damage.',
            features: ['24/7 Response Team', 'Emergency Repairs', 'Disaster Cleanup', 'Crisis Management', 'Urgent Maintenance'],
            image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
    };
    
    const data = serviceData[service];
    if (!data) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'service-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${data.title}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="${data.image}" alt="${data.title}">
                </div>
                <div class="modal-text">
                    <p>${data.description}</p>
                    <h4>What's Included:</h4>
                    <ul>
                        ${data.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                    </ul>
                    <div class="modal-actions">
                        <button class="btn-primary" onclick="scrollToContact()">Get Quote</button>
                        <button class="btn-secondary" onclick="closeServiceModal()">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        padding: 2rem;
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Close event listeners
    modal.querySelector('.modal-close').addEventListener('click', closeServiceModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeServiceModal();
    });
}

function closeServiceModal() {
    const modal = document.querySelector('.service-modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

function scrollToContact() {
    closeServiceModal();
    setTimeout(() => {
        document.querySelector('#contact').scrollIntoView({
            behavior: 'smooth'
        });
    }, 300);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${type === 'success' ? '#48bb78' : '#4299e1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 300);
}

// Advanced Interactions
function initializeAdvancedInteractions() {
    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
    
    // Floating elements animation
    createFloatingElements();
    
    // Interactive service cards
    initializeServiceCards();
}

// Floating Background Elements
function createFloatingElements() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 6; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.cssText = `
            position: absolute;
            width: ${Math.random() * 60 + 20}px;
            height: ${Math.random() * 60 + 20}px;
            background: rgba(255, 215, 0, 0.1);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 3 + 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            pointer-events: none;
        `;
        
        hero.appendChild(element);
    }
}

// Add floating animation CSS
const floatingCSS = `
@keyframes float {
    0%, 100% {
        transform: translateY(0px) rotate(0deg);
        opacity: 0.1;
    }
    50% {
        transform: translateY(-20px) rotate(180deg);
        opacity: 0.3;
    }
}
`;

const floatingStyle = document.createElement('style');
floatingStyle.textContent = floatingCSS;
document.head.appendChild(floatingStyle);

// Modal Styles
const modalCSS = `
.modal-content {
    background: white;
    border-radius: 12px;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
    from {
        transform: scale(0.7) translateY(-50px);
        opacity: 0;
    }
    to {
        transform: scale(1) translateY(0);
        opacity: 1;
    }
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid #e2e8f0;
}

.modal-header h2 {
    color: #1e3c72;
    margin: 0;
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #718096;
    padding: 0.5rem;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.modal-close:hover {
    background: #f7fafc;
    color: #1e3c72;
}

.modal-body {
    padding: 2rem;
}

.modal-image {
    margin-bottom: 1.5rem;
}

.modal-image img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 8px;
}

.modal-text p {
    color: #4a5568;
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.modal-text h4 {
    color: #2d3748;
    margin-bottom: 1rem;
}

.modal-text ul {
    list-style: none;
    margin-bottom: 2rem;
}

.modal-text li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    color: #4a5568;
}

.modal-text li i {
    color: #ffd700;
}

.modal-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
}

.btn-primary, .btn-secondary {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn-primary {
    background: #1e3c72;
    color: white;
}

.btn-primary:hover {
    background: #2a5298;
    transform: translateY(-2px);
}

.btn-secondary {
    background: #e2e8f0;
    color: #4a5568;
}

.btn-secondary:hover {
    background: #cbd5e0;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.notification-close {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.notification-close:hover {
    background: rgba(255, 255, 255, 0.2);
}
`;

const modalStyle = document.createElement('style');
modalStyle.textContent = modalCSS;
document.head.appendChild(modalStyle);

// Interactive Elements Enhancement
function enhanceInteractivity() {
    // Add hover sound effects (optional)
    const interactiveElements = document.querySelectorAll('button, .cta-button, .service-card, .team-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
    
    // Add focus indicators for keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Performance Optimizations
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Throttle scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) originalScrollHandler();
        }, 16); // ~60fps
    };
}

// Touch and Gesture Support
function initializeTouchSupport() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    const hero = document.querySelector('.hero');
    
    hero.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    hero.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                document.getElementById('heroNext').click();
            } else {
                // Swipe right - previous slide
                document.getElementById('heroPrev').click();
            }
        }
    }
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Call all initialization functions
    setTimeout(() => {
        initializeAdvancedInteractions();
        enhanceInteractivity();
        optimizePerformance();
        initializeTouchSupport();
    }, 100);
});

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // Could show user-friendly error message
});

// Accessibility Enhancements
function enhanceAccessibility() {
    // Add keyboard navigation for sliders
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeServiceModal();
            closeMobileMenu();
        }
    });
    
    // Announce dynamic content changes to screen readers
    function announceChange(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Announce slide changes
    const heroSlides = document.querySelectorAll('.hero-slide');
    const slideObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.classList.contains('active')) {
                announceChange('Hero slide changed');
            }
        });
    });
    
    heroSlides.forEach(slide => {
        slideObserver.observe(slide, { attributes: true, attributeFilter: ['class'] });
    });
}

// Initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', enhanceAccessibility);

// Service Worker Registration (for better performance)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // This would register a service worker if you had one
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Analytics and User Interaction Tracking
function trackUserInteraction(action, element) {
    // This would send analytics data to your tracking service
    console.log(`User interaction: ${action} on ${element}`);
    
    // Example: Track button clicks, form submissions, etc.
    // analytics.track(action, { element, timestamp: Date.now() });
}

// Add interaction tracking to key elements
document.addEventListener('click', (e) => {
    if (e.target.matches('button, .cta-button, .service-card')) {
        trackUserInteraction('click', e.target.className);
    }
});

// Smooth reveal animations for better UX
function initializeRevealAnimations() {
    const revealElements = document.querySelectorAll('.fade-in');
    
    revealElements.forEach((element, index) => {
        element.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Initialize reveal animations
document.addEventListener('DOMContentLoaded', initializeRevealAnimations);

// Learn More Modal Functionality
function initializeLearnMoreModal() {
    const learnMoreBtns = document.querySelectorAll('.service-cta');
    const modal = document.getElementById('learnMoreModal');
    const closeBtn = document.getElementById('closeModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    
    // Open modal when Learn More is clicked
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = 'flex';
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal functions
    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
    
    // Close modal event listeners
    closeBtn.addEventListener('click', closeModal);
    closeModalBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Initialize Learn More modal
document.addEventListener('DOMContentLoaded', initializeLearnMoreModal);