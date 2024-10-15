// Login Credentials
const adminUsername = "admin";
const adminPassword = "admin";

// Handle Login
document.getElementById('login-form')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const loginId = document.getElementById('login-id').value;
    const loginPassword = document.getElementById('login-password').value;

    if (loginId === adminUsername && loginPassword === adminPassword) {
        window.location.href = "home.html"; // Redirect to home page
    } else {
        document.getElementById('login-feedback').innerText = "Invalid credentials, please try again.";
    }
});

// Existing code for home.html functionalities
const correctPin = "1234"; // Set your PIN

// Unlock Password Manager
function unlockManager() {
    let pin = document.getElementById('pin').value;
    if (pin === correctPin) {
        document.getElementById('stored-passwords').style.display = "block";
        loadStoredPasswords();  // Load saved passwords when the manager is unlocked
        alert("Password Manager Unlocked!");
    } else {
        alert("Incorrect PIN, try again.");
    }
}

// Lock Password Manager
function lockManager() {
    document.getElementById('stored-passwords').style.display = "none";
    document.getElementById('pin').value = ''; // Clear the PIN field
    alert("Password Manager Locked!");
}

// Password Generator
document.getElementById('password-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    let name = document.getElementById('name').value;
    let dob = document.getElementById('dob').value;
    let fatherName = document.getElementById('father-name').value;
    let motherName = document.getElementById('mother-name').value;
    let petName = document.getElementById('pet-name').value;
    let friendName = document.getElementById('friend-name').value;
    let phoneNumber = document.getElementById('phone-number').value;
    let passwordLength = document.getElementById('password-length').value;

    let password = generateMeaningfulPassword(name, phoneNumber, passwordLength);
    document.getElementById('generated-password').innerText = "Generated Password: " + password;

    // Store the generated password in the manager
    storePassword(password);
});

// Function to generate a meaningful password
function generateMeaningfulPassword(name, phoneNumber, length) {
    if (length < name.length + 4) {
        length = name.length + 4; // Minimum length
    }

    let nameParts = name.split(' ');
    let nameInitials = nameParts.map(part => part.charAt(0)).join('');
    let phoneEnding = phoneNumber.slice(-4);  // Last 4 digits of phone number
    let baseString = nameInitials + phoneEnding;

    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
    let password = baseString;

    while (password.length < length) {
        password += charset[Math.floor(Math.random() * charset.length)];
    }

    password = password.split('').sort(() => 0.5 - Math.random()).join('');
    return password.substring(0, length);
}

// Password Strength Checker
function checkStrength() {
    let password = document.getElementById('check-password').value;
    let strength = calculateStrength(password);
    document.getElementById('strength-feedback').innerText = "Password Strength: " + strength;
}

function calculateStrength(password) {
    let strength = "Weak";
    if (password.length > 8 && /[A-Z]/.test(password) && /\d/.test(password) && /[\W]/.test(password)) {
        strength = "Strong";
    } else if (password.length > 6) {
        strength = "Medium";
    }
    return strength;
}

// Store passwords in localStorage
function storePassword(password) {
    let storedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
    storedPasswords.push(password);
    localStorage.setItem('passwords', JSON.stringify(storedPasswords));
    displayPassword(password);
}

// Display stored passwords
function displayPassword(password) {
    let passwordList = document.getElementById('password-list');
    let listItem = document.createElement('li');
    listItem.innerText = password;
    
    let deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete";
    deleteButton.onclick = function() {
        deletePassword(password);
    };

    listItem.appendChild(deleteButton);
    passwordList.appendChild(listItem);
}

// Load stored passwords from localStorage
function loadStoredPasswords() {
    let storedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
    let passwordList = document.getElementById('password-list');
    passwordList.innerHTML = '';  // Clear the list before loading

    storedPasswords.forEach(password => {
        displayPassword(password);
    });
}

// Delete specific password from localStorage
function deletePassword(password) {
    let storedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
    storedPasswords = storedPasswords.filter(p => p !== password);  // Remove the password
    localStorage.setItem('passwords', JSON.stringify(storedPasswords));
    loadStoredPasswords();  // Reload the password list
    alert("Password Deleted");
}

// Clear all passwords
function clearPasswords() {
    localStorage.removeItem('passwords');  // Remove all passwords from localStorage
    loadStoredPasswords();  // Reload the password list (now empty)
    alert("All stored passwords have been deleted.");
}

