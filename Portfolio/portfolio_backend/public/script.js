const projectCarousel = document.querySelector('.project-carousel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Carousel functionality
nextBtn.addEventListener('click', () => {
    projectCarousel.scrollBy({
        left: 300,
        behavior: "smooth"
    });
});

prevBtn.addEventListener('click', () => {
    projectCarousel.scrollBy({
        left: -300,
        behavior: "smooth"
    });
});

// Toggle project details visibility
function toggleDetails(button) {
    const details = button.nextElementSibling;

    if (details.style.display === "none") {
        details.style.display = "block";
        button.textContent = "Hide Details";
    } else {
        details.style.display = "none";
        button.textContent = "View Details";
    }
}

// Get elements for form and errors
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const thankYouMessage = document.getElementById('thankYouMessage');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

// Real-time validation
function validateInput() {
    let valid = true;

    if (nameInput.value.trim() === '') {
        nameError.innerText = 'Please enter your name.';
        nameError.style.display = 'block';
        valid = false;
    } else {
        nameError.style.display = 'none';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        emailError.innerText = 'Please enter a valid email address.';
        emailError.style.display = 'block';
        valid = false;
    } else {
        emailError.style.display = 'none';
    }

    if (messageInput.value.trim() === '') {
        messageError.innerText = 'Please enter a message.';
        messageError.style.display = 'block';
        valid = false;
    } else {
        messageError.style.display = 'none';
    }

    return valid;
}

// Submit form event
form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Validate the form
    if (validateInput()) {
        // Use Formspree to handle the form submission
        const formData = new FormData(form);

        fetch('https://formspree.io/f/xzzbpqbw', { // Replace with your Formspree URL
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Handle successful submission
                form.reset(); // Reset the form fields
                form.style.display = 'none'; // Hide the form
                thankYouMessage.style.display = 'block'; // Show thank you message
            } else {
                alert("Failed to send the message. Please try again.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Failed to send the message. Please try again.");
        });
    }
});

// Initialize Skill Bars
document.addEventListener('DOMContentLoaded', function () {
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach((bar) => {
        const level = bar.getAttribute('data-skill-level');
        if (level) {
            bar.style.width = level + '%';
        }
    });
});

// Update Skills Dynamically
document.getElementById('update-skills')?.addEventListener('click', function () {
    const skills = document.querySelectorAll('.skill');
    skills.forEach((skill) => {
        const skillName = skill.querySelector('.skill-name').textContent;
        const newLevel = parseInt(prompt(`Enter new level for ${skillName} (0-100):`), 10);
        if (isNaN(newLevel) || newLevel < 0 || newLevel > 100) {
            alert("Please enter a valid number between 0 and 100.");
            return;
        }

        const skillBar = skill.querySelector('.skill-bar');
        const skillLevel = skill.querySelector('.skill-level');
        skillBar.setAttribute('data-skill-level', newLevel);
        skillBar.style.width = `${newLevel}%`;
        skillLevel.textContent = `${newLevel}%`;
    });
});
document.querySelector('.download-btn').addEventListener('click', function () {
    alert('Your resume will start downloading shortly.');
});
