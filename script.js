document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const donationScreen = document.getElementById('donation-screen');
    const mainContent = document.getElementById('main-content');
    // Select all buttons with the class 'access-button'
    const accessButtons = document.querySelectorAll('.access-button');

    // Simulate loading time
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.addEventListener('transitionend', () => {
            loadingScreen.classList.add('hidden');
            donationScreen.classList.remove('hidden');
            // Add a small delay before showing the donation screen content for the animation to play
            setTimeout(() => {
                // Ensure the donation screen content becomes visible
                donationScreen.querySelector('.bg-white').style.transform = 'scale(1)';
                donationScreen.querySelector('.bg-white').style.opacity = '1';
            }, 50);
        }, { once: true });
    }, 2000); // Changed to 2 seconds for a slightly faster load

    // Function to grant access and transition to main content
    const grantAccess = () => {
        donationScreen.querySelector('.bg-white').style.transform = 'scale(0.95)';
        donationScreen.querySelector('.bg-white').style.opacity = '0';
        donationScreen.addEventListener('transitionend', () => {
            donationScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            setTimeout(() => {
                mainContent.style.opacity = '1';
            }, 50); // Small delay for the fade-in effect
        }, { once: true });
    };

    // Add event listeners to all access buttons
    accessButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dataType = button.dataset.type;

            if (dataType === 'donate') {
                const paypalLink = "https://www.paypal.com/donate?hosted_button_id=5MH5HTSKWLHKA";
                console.log(`Redirecting to PayPal: ${paypalLink}`);

                // Open PayPal link in a new tab
                window.open(paypalLink, '_blank');

                // Immediately grant access to the site content
                grantAccess();
            } else { // This is the "Free Access" button
                console.log('Granting free access.');
                grantAccess();
            }
        });
    });
});
