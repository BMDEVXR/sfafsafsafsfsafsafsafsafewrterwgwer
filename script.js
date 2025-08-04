// Smooth scrolling functionality for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add click event listener to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section ID from the href attribute
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Calculate the offset position (accounting for sticky navbar)
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                // Smooth scroll to the target section
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active link highlighting based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('.section');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const scrollPosition = window.scrollY + navbarHeight + 50;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`a[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current section's nav link
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }
    
    // Add scroll event listener for active link highlighting
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Call once on page load to set initial active state
    updateActiveNavLink();
    
    // Add fade-in animation for sections on scroll
    function animateOnScroll() {
        const sections = document.querySelectorAll('.section');
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Check if section is in viewport
            if (scrollTop + windowHeight > sectionTop + 100) {
                section.classList.add('animate-in');
            }
        });
    }
    
    // Add scroll event listener for animations
    window.addEventListener('scroll', animateOnScroll);
    
    // Call once on page load
    animateOnScroll();
    
    // Simple fade-in animation for sections
    const sections = document.querySelectorAll('.section');
    
    // Intersection Observer for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Add CSS for active nav link and animations
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #667eea !important;
    }
    
    .nav-link.active::after {
        width: 80% !important;
    }
    
    .section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
`;
document.head.appendChild(style);
