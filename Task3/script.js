const form = document.getElementById('registrationForm');
const passwordInput = document.getElementById('password');
const strengthFill = document.querySelector('.strength-fill');
const strengthText = document.getElementById('strengthText');

const validationRules = {
    fullName: {
        required: true,
        pattern: /^[a-zA-Z\s]{3,}$/,
        message: 'Please enter a valid full name (at least 3 characters, letters only)'
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
    },
    phone: {
        required: true,
        pattern: /^[\d\s\-\+]{10,}$/,
        message: 'Please enter a valid phone number (at least 10 digits)'
    },
    dob: {
        required: true,
        validate: (value) => {
            const age = new Date().getFullYear() - new Date(value).getFullYear();
            return age >= 18 && age <= 100;
        },
        message: 'You must be at least 18 years old'
    },
    gender: {
        required: true,
        message: 'Please select a gender'
    },
    nationality: {
        required: true,
        pattern: /^[a-zA-Z\s]{2,}$/,
        message: 'Please enter a valid nationality'
    },
    street: {
        required: true,
        message: 'Please enter your street address'
    },
    city: {
        required: true,
        pattern: /^[a-zA-Z\s]{2,}$/,
        message: 'Please enter a valid city name'
    },
    state: {
        required: true,
        pattern: /^[a-zA-Z\s]{2,}$/,
        message: 'Please enter a valid state name'
    },
    zip: {
        required: true,
        pattern: /^[a-zA-Z0-9\s\-]{3,}$/,
        message: 'Please enter a valid ZIP/postal code'
    },
    country: {
        required: true,
        pattern: /^[a-zA-Z\s]{2,}$/,
        message: 'Please enter a valid country name'
    },
    education: {
        required: true,
        message: 'Please select your education level'
    },
    experience: {
        required: true,
        pattern: /^\d+$/,
        message: 'Please enter a valid number for years of experience'
    },
    designation: {
        required: true,
        pattern: /^[a-zA-Z\s]{2,}$/,
        message: 'Please enter a valid job title'
    },
    skills: {
        required: true,
        message: 'Please enter at least one skill'
    },
    password: {
        required: true,
        validate: (value) => value.length >= 8,
        message: 'Password must be at least 8 characters long'
    },
    confirmPassword: {
        required: true,
        validate: (value) => value === passwordInput.value,
        message: 'Passwords do not match'
    },
    terms: {
        required: true,
        message: 'You must agree to the Terms & Conditions'
    },
    privacy: {
        required: true,
        message: 'You must agree to the Privacy Policy'
    }
};

function validateField(fieldName) {
    const field = form.elements[fieldName];
    const rules = validationRules[fieldName];
    const errorElement = field.parentElement.querySelector('.error-message') || document.getElementById(fieldName + 'Error');

    if (!rules) return true;

    let isValid = true;
    let message = '';

    if (rules.required && !field.value.trim()) {
        isValid = false;
        message = rules.message;
    }

    if (isValid && field.value && rules.pattern && !rules.pattern.test(field.value)) {
        isValid = false;
        message = rules.message;
    }

    if (isValid && field.value && rules.validate && !rules.validate(field.value)) {
        isValid = false;
        message = rules.message;
    }

    if (!isValid) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        field.classList.add('error');
    } else {
        errorElement.classList.remove('show');
        field.classList.remove('error');
    }

    return isValid;
}

function validateForm() {
    let isValid = true;
    Object.keys(validationRules).forEach(fieldName => {
        if (!validateField(fieldName)) {
            isValid = false;
        }
    });
    return isValid;
}

function updatePasswordStrength(password) {
    let strength = 0;
    const strongRegex = new RegExp('^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])');
    const mediumRegex = new RegExp('^(?=.{6,})(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))');

    if (password.length === 0) {
        strength = 0;
        strengthText.textContent = 'Password strength: -';
    } else if (strongRegex.test(password)) {
        strength = 100;
        strengthText.textContent = 'Password strength: Strong';
        strengthText.style.color = '#10b981';
    } else if (mediumRegex.test(password)) {
        strength = 66;
        strengthText.textContent = 'Password strength: Medium';
        strengthText.style.color = '#f59e0b';
    } else {
        strength = 33;
        strengthText.textContent = 'Password strength: Weak';
        strengthText.style.color = '#ef4444';
    }

    strengthFill.style.width = strength + '%';
    strengthFill.style.backgroundColor = 
        strength <= 33 ? '#ef4444' : 
        strength <= 66 ? '#f59e0b' : '#10b981';
}

Object.keys(validationRules).forEach(fieldName => {
    const field = form.elements[fieldName];
    if (field) {
        field.addEventListener('blur', () => validateField(fieldName));
        field.addEventListener('input', () => {
            validateField(fieldName);
            if (fieldName === 'password') {
                updatePasswordStrength(field.value);
            }
            if (fieldName === 'confirmPassword') {
                validateField(fieldName);
            }
        });
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        console.log('Form Data:', data);

        document.getElementById('successOverlay').classList.add('show');

        setTimeout(() => {
            form.reset();
            updatePasswordStrength('');
        }, 500);
    } else {
        console.log('Form validation failed');
    }
});

function closeSuccessModal() {
    document.getElementById('successOverlay').classList.remove('show');
}

document.getElementById('successOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'successOverlay') {
        closeSuccessModal();
    }
});

updatePasswordStrength('');
