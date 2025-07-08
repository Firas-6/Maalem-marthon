// DOM Elements
const registrationForm = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.querySelector('.btn-text');
const btnLoading = document.querySelector('.btn-loading');
const menuBtn = document.getElementById('menuBtn');
const userBtn = document.getElementById('userBtn');

// Form validation patterns
const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[0-9+\-\s()]+$/
};

// Arabic validation messages
const messages = {
    required: 'هذا الحقل مطلوب',
    invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح',
    invalidPhone: 'يرجى إدخال رقم جوال صحيح',
    success: 'تم إنشاء الحساب بنجاح!',
    error: 'حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.'
};

// Show message function
function showMessage(message, type = 'success') {
    // Remove existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message element
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;
    messageEl.textContent = message;

    // Insert message before form
    const formCard = document.querySelector('.form-card');
    const formHeader = document.querySelector('.form-header');
    formHeader.appendChild(messageEl);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.remove();
        }
    }, 5000);
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        setFieldError(field, messages.required);
        return false;
    }

    // Validate email
    if (fieldName === 'email' && value && !patterns.email.test(value)) {
        setFieldError(field, messages.invalidEmail);
        return false;
    }

    // Validate phone
    if (fieldName === 'phone' && value && !patterns.phone.test(value)) {
        setFieldError(field, messages.invalidPhone);
        return false;
    }

    // Clear error if validation passes
    clearFieldError(field);
    return true;
}

// Set field error
function setFieldError(field, message) {
    field.style.borderColor = '#ef4444';
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }

    // Add error message
    const errorEl = document.createElement('div');
    errorEl.className = 'field-error';
    errorEl.style.color = '#ef4444';
    errorEl.style.fontSize = '0.75rem';
    errorEl.style.marginTop = '0.25rem';
    errorEl.style.textAlign = 'right';
    errorEl.textContent = message;
    
    field.parentNode.appendChild(errorEl);
}

// Clear field error
function clearFieldError(field) {
    field.style.borderColor = '#d9d9d9';
    const errorEl = field.parentNode.querySelector('.field-error');
    if (errorEl) {
        errorEl.remove();
    }
}

// Set loading state
function setLoading(loading) {
    if (loading) {
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
    } else {
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
}

// Handle form submission
async function handleSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(registrationForm);
    const data = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone')
    };

    // Validate all fields
    const fields = registrationForm.querySelectorAll('input[required]');
    let isValid = true;

    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    if (!isValid) {
        return;
    }

    // Set loading state
    setLoading(true);

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate success/error randomly for demo
        if (Math.random() > 0.2) {
            showMessage(messages.success, 'success');
            registrationForm.reset();
        } else {
            throw new Error('Simulated error');
        }
    } catch (error) {
        showMessage(messages.error, 'error');
    } finally {
        setLoading(false);
    }
}

// Add event listeners
registrationForm.addEventListener('submit', handleSubmit);

// Real-time validation
const inputs = registrationForm.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(239, 68, 68)') {
            validateField(input);
        }
    });
});

// Header button handlers
menuBtn.addEventListener('click', () => {
    console.log('Menu clicked');
    // Add your menu logic here
});

userBtn.addEventListener('click', () => {
    console.log('User profile clicked');
    // Add your user profile logic here
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Arabic Registration Form initialized');
});