/**
 * Interactive Web Development Assignment - Week 6
 * JavaScript Event Handling, Interactive Elements, and Form Validation
 */

// Wait for DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Interactive Web Page Loaded Successfully!');
    
    // Initialize all interactive features
    initThemeToggle();
    initCounter();
    initFAQ();
    initTabs();
    initFormValidation();
});

/**
 * PART 1 & 2: INTERACTIVE ELEMENTS
 * Theme Toggle Functionality (Light/Dark Mode)
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
    
    // Event listener for theme toggle button
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply theme with smooth transition
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButton(newTheme);
        
        // Add visual feedback
        themeToggle.classList.add('pulse');
        setTimeout(() => themeToggle.classList.remove('pulse'), 300);
        
        console.log(`Theme switched to: ${newTheme}`);
    });
    
    function updateThemeButton(theme) {
        themeToggle.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    }
}

/**
 * Interactive Counter Feature
 */
function initCounter() {
    const counterValue = document.getElementById('counter-value');
    const decreaseBtn = document.getElementById('counter-decrease');
    const increaseBtn = document.getElementById('counter-increase');
    const resetBtn = document.getElementById('counter-reset');
    
    let count = 0;
    
    // Function to update counter display with animation
    function updateCounter(newCount) {
        count = newCount;
        counterValue.textContent = count;
        counterValue.classList.add('pulse');
        setTimeout(() => counterValue.classList.remove('pulse'), 300);
        
        // Change color based on value
        if (count > 0) {
            counterValue.style.color = '#27ae60'; // Green for positive
        } else if (count < 0) {
            counterValue.style.color = '#e74c3c'; // Red for negative
        } else {
            counterValue.style.color = 'var(--primary-color)'; // Default for zero
        }
    }
    
    // Event listeners for counter buttons
    decreaseBtn.addEventListener('click', function() {
        updateCounter(count - 1);
        console.log('Counter decreased to:', count);
    });
    
    increaseBtn.addEventListener('click', function() {
        updateCounter(count + 1);
        console.log('Counter increased to:', count);
    });
    
    resetBtn.addEventListener('click', function() {
        updateCounter(0);
        console.log('Counter reset to 0');
    });
    
    // Keyboard support for counter (when focused)
    document.addEventListener('keydown', function(e) {
        if (e.target.closest('.counter-display')) {
            if (e.key === 'ArrowUp' || e.key === '+') {
                e.preventDefault();
                updateCounter(count + 1);
            } else if (e.key === 'ArrowDown' || e.key === '-') {
                e.preventDefault();
                updateCounter(count - 1);
            } else if (e.key === 'r' || e.key === 'R') {
                e.preventDefault();
                updateCounter(0);
            }
        }
    });
}

/**
 * Collapsible FAQ Functionality
 */
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
                console.log('FAQ opened:', this.textContent.replace('+', '').trim());
            }
        });
        
        // Add keyboard support
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

/**
 * Tabbed Interface Functionality
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Add fade-in animation
            document.getElementById(targetTab).classList.add('fade-in');
            setTimeout(() => {
                document.getElementById(targetTab).classList.remove('fade-in');
            }, 500);
            
            console.log('Tab switched to:', targetTab);
        });
        
        // Keyboard support for tabs
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

/**
 * PART 3: FORM VALIDATION
 * Comprehensive form validation with real-time feedback
 */
function initFormValidation() {
    const form = document.getElementById('registration-form');
    const inputs = form.querySelectorAll('input');
    
    // Validation rules and patterns
    const validationRules = {
        fullName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Full name must contain only letters and spaces (minimum 2 characters)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        password: {
            required: true,
            minLength: 8,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
            message: 'Password must be at least 8 characters with uppercase, lowercase, and number'
        },
        confirmPassword: {
            required: true,
            matchField: 'password',
            message: 'Passwords do not match'
        },
        phone: {
            required: false,
            pattern: /^\(\d{3}\)\s\d{3}-\d{4}$|^\d{10}$/,
            message: 'Phone number must be in format (123) 456-7890 or 1234567890'
        },
        age: {
            required: false,
            min: 13,
            max: 120,
            message: 'Age must be between 13 and 120'
        },
        terms: {
            required: true,
            message: 'You must accept the terms and conditions'
        }
    };
    
    // Add event listeners for real-time validation
    inputs.forEach(input => {
        // Validate on blur (when user leaves field)
        input.addEventListener('blur', function() {
            validateField(input, validationRules);
        });
        
        // Validate on input for immediate feedback
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(input, validationRules);
            }
        });
        
        // Special handling for password confirmation
        if (input.name === 'confirmPassword' || input.name === 'password') {
            input.addEventListener('input', function() {
                const password = document.getElementById('password');
                const confirmPassword = document.getElementById('confirmPassword');
                if (confirmPassword.value) {
                    validateField(confirmPassword, validationRules);
                }
            });
        }
    });
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submission attempted');
        
        let isValid = true;
        const formData = {};
        
        // Validate all fields
        inputs.forEach(input => {
            if (!validateField(input, validationRules)) {
                isValid = false;
            } else {
                formData[input.name] = input.value;
            }
        });
        
        if (isValid) {
            // Simulate successful form submission
            console.log('Form validation passed! Form data:', formData);
            showSuccessMessage();
            form.reset();
            clearValidationStates();
        } else {
            console.log('Form validation failed');
            // Scroll to first error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.focus();
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    /**
     * Validate individual form field
     */
    function validateField(input, rules) {
        const fieldName = input.name;
        const value = input.value.trim();
        const rule = rules[fieldName];
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        if (!rule) return true;
        
        let isValid = true;
        let errorMessage = '';
        
        // Check required fields
        if (rule.required && (!value || (input.type === 'checkbox' && !input.checked))) {
            isValid = false;
            errorMessage = rule.message || `${fieldName} is required`;
        }
        // Check minimum length
        else if (rule.minLength && value && value.length < rule.minLength) {
            isValid = false;
            errorMessage = rule.message || `Minimum ${rule.minLength} characters required`;
        }
        // Check pattern matching
        else if (rule.pattern && value && !rule.pattern.test(value)) {
            isValid = false;
            errorMessage = rule.message;
        }
        // Check field matching (for password confirmation)
        else if (rule.matchField && value) {
            const matchFieldValue = document.getElementById(rule.matchField).value;
            if (value !== matchFieldValue) {
                isValid = false;
                errorMessage = rule.message;
            }
        }
        // Check numeric ranges
        else if (rule.min && value && parseInt(value) < rule.min) {
            isValid = false;
            errorMessage = rule.message;
        }
        else if (rule.max && value && parseInt(value) > rule.max) {
            isValid = false;
            errorMessage = rule.message;
        }
        
        // Update field appearance and error message
        if (isValid) {
            input.classList.remove('error');
            input.classList.add('success');
            errorElement.textContent = '';
        } else {
            input.classList.remove('success');
            input.classList.add('error');
            errorElement.textContent = errorMessage;
        }
        
        return isValid;
    }
    
    /**
     * Show success message after form submission
     */
    function showSuccessMessage() {
        const successMessage = document.getElementById('success-message');
        const formSection = document.querySelector('.form-section');
        
        // Hide form and show success message
        form.style.display = 'none';
        successMessage.style.display = 'block';
        successMessage.classList.add('fade-in');
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Reset after 5 seconds
        setTimeout(() => {
            form.style.display = 'block';
            successMessage.style.display = 'none';
            successMessage.classList.remove('fade-in');
        }, 5000);
    }
    
    /**
     * Clear all validation states from form
     */
    function clearValidationStates() {
        inputs.forEach(input => {
            input.classList.remove('error', 'success');
            const errorElement = document.getElementById(`${input.name}-error`);
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
    }
    
    /**
     * Phone number formatting on input
     */
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        
        if (value.length >= 6) {
            value = `(${value.slice(0,3)}) ${value.slice(3,6)}-${value.slice(6,10)}`;
        } else if (value.length >= 3) {
            value = `(${value.slice(0,3)}) ${value.slice(3)}`;
        }
        
        e.target.value = value;
    });
}

/**
 * ADDITIONAL INTERACTIVE FEATURES
 * Keyboard navigation and accessibility enhancements
 */

// Enhanced keyboard navigation for all interactive elements
document.addEventListener('keydown', function(e) {
    // Global keyboard shortcuts
    if (e.altKey && e.key === 't') {
        e.preventDefault();
        document.getElementById('theme-toggle').click();
        console.log('Theme toggled via keyboard shortcut (Alt+T)');
    }
    
    // Tab trap for modal-like elements
    if (e.key === 'Tab') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.closest('.faq-item.active')) {
            // Keep focus within active FAQ item
            const faqItem = activeElement.closest('.faq-item');
            const focusableElements = faqItem.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
});

/**
 * Smooth scrolling for internal navigation
 */
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Performance optimization: Debounced resize handler
 */
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        console.log('Window resized - adjusting layouts if necessary');
        // Add any responsive adjustments here
    }, 250);
});

/**
 * Error handling and user feedback
 */
window.addEventListener('error', function(e) {
    console.error('JavaScript error occurred:', e.error);
    // In a real application, you might want to show a user-friendly error message
});

/**
 * Progressive Enhancement: Check for browser capabilities
 */
function checkBrowserCapabilities() {
    const features = {
        localStorage: typeof(Storage) !== "undefined",
        css3: CSS.supports('display', 'grid'),
        es6: typeof Symbol !== "undefined"
    };
    
    console.log('Browser capabilities:', features);
    
    // Graceful degradation for older browsers
    if (!features.localStorage) {
        console.warn('localStorage not supported - theme preference will not persist');
    }
    
    return features;
}

/**
 * Animation utilities
 */
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

/**
 * Utility function: Generate random color
 */
function getRandomColor() {
    const colors = ['#3498db', '#e74c3c', '#27ae60', '#f39c12', '#9b59b6', '#1abc9c'];
    return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Initialize all capabilities and features
 */
checkBrowserCapabilities();

// Add visual feedback for all buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

console.log('🎉 All interactive features initialized successfully!');