// script.js

document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const donationScreen = document.getElementById('donation-screen');
    const mainContent = document.getElementById('main-content');
    const accessButtons = document.querySelectorAll('.access-button');

    // IMPORTANT: Replace 'YOUR_PAYPAL_ME_USERNAME' with your actual PayPal.me username
    // Example: If your PayPal.me link is paypal.me/johnsmith, then use 'johnsmith'
    const PAYPAL_ME_BASE_URL = 'https://paypal.me/YOUR_PAYPAL_ME_USERNAME/';

    // Simulate loading time
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.addEventListener('transitionend', () => {
            loadingScreen.classList.add('hidden');
            donationScreen.classList.remove('hidden');
            // Add a small delay before showing the donation screen content for the animation to play
            setTimeout(() => {
                donationScreen.classList.add('show');
            }, 50);
        }, { once: true });
    }, 3000); // 3 seconds loading time

    // Function to grant access and transition to main content
    // This function will now ONLY be called for "Free Access" or for the
    // simulated "Donate" action if the PayPal.me URL isn't configured.
    // For actual PayPal clicks, the user is redirected away.
    const grantAccess = () => {
        donationScreen.style.opacity = '0';
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
            const amount = button.dataset.amount; // e.g., "5", "10", "15"

            if (dataType === 'donate') {
                // Check if the PayPal.me URL has been configured
                if (PAYPAL_ME_BASE_URL.includes('YOUR_PAYPAL_ME_USERNAME')) {
                    alert("Please update 'YOUR_PAYPAL_ME_USERNAME' in script.js with your actual PayPal.me link to enable donations.");
                    console.error("PayPal.me URL not configured. Please replace 'YOUR_PAYPAL_ME_USERNAME' in script.js.");
                    // For demonstration purposes, if not configured, still grant access
                    // so you can see the main content. In a real app, you'd likely prevent access.
                    grantAccess();
                    return; // Stop further execution for this button click
                }

                // Construct the PayPal.me URL with the specific amount
                const paypalLink = `${PAYPAL_ME_BASE_URL}${amount}`;
                console.log(`Redirecting to PayPal for $${amount}: ${paypalLink}`);

                // Redirect the user to PayPal. They will leave your site.
                window.location.href = paypalLink;

                // IMPORTANT: When redirecting to PayPal, we do NOT call grantAccess()
                // here. Content access after a real donation usually requires a backend
                // system to verify the payment, as users might close the PayPal tab.

            } else { // This is the "Free Access" button
                console.log('Granting free access.');
                grantAccess();
            }
        });
    });
});
