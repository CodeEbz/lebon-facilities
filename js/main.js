// Add interactivity here if needed
console.log('LeBron Facilities landing page loaded.');

// Example: Show an alert when "Request a Quote" button is clicked
document.addEventListener('DOMContentLoaded', function() {
    const quoteBtn = document.querySelector('.hero button');
    if (quoteBtn) {
        quoteBtn.addEventListener('click', function() {
            alert('Thank you for your interest! We will contact you soon.');
        });
    }
});