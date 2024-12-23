// Function to set active navigation item
function setActiveNavItem(page) {
    document.querySelectorAll('.nav-item').forEach(item => {
        const img = item.querySelector('img');
        const navPage = item.getAttribute('data-page');

        if (img) {
            // Reset all nav items to default state
            item.classList.remove('active');
            img.src = img.getAttribute('data-original-icon');

            // Activate the matched item
            if (navPage === page) {
                item.classList.add('active');
                const activeIcon = item.getAttribute('data-active-icon');
                img.src = activeIcon || img.getAttribute('data-original-icon');
            }
        }
    });
}

document.querySelectorAll('.nav-item').forEach(item => {
    const img = item.querySelector('img');
    if (img && !img.getAttribute('data-original-icon')) {
        img.setAttribute('data-original-icon', img.src);
    }

    item.addEventListener('click', function () {
        const page = item.getAttribute('data-page');
        setActiveNavItem(page);
        window.location.hash = page;
    });
});

// Initialize carousels
function initializeCarousels() {
    document.querySelectorAll('.carousel-view').forEach(carousel => {
        const prev = carousel.querySelector('.prev-btn');
        const next = carousel.querySelector('.next-btn');
        const list = carousel.querySelector('.item-list');
        const itemWidth = 220; // Width of each carousel item

        if (prev && next && list) {
            // Ensure arrows are displayed initially
            updateArrows(list, prev, next);

            // Event Listeners for Prev and Next
            prev.addEventListener('click', () => {
                list.scrollBy({ left: -itemWidth, behavior: 'smooth' });
                // Update arrows after scroll
                list.addEventListener('scroll', () => updateArrows(list, prev, next), { once: true });
            });

            next.addEventListener('click', () => {
                list.scrollBy({ left: itemWidth, behavior: 'smooth' });
                // Update arrows after scroll
                list.addEventListener('scroll', () => updateArrows(list, prev, next), { once: true });
            });
        }
    });
}

// Function to update arrow button visibility
function updateArrows(list, prev, next) {
    if (list && prev && next) {
        const scrollLeft = list.scrollLeft;
        const maxScrollLeft = list.scrollWidth - list.clientWidth;

        // Always display both buttons
        prev.style.display = 'block';
        next.style.display = 'block';

        // Add or remove 'disabled' class based on scroll position
        prev.classList.toggle('disabled', scrollLeft <= 0);
        next.classList.toggle('disabled', scrollLeft >= maxScrollLeft);
    }
}


// Countdown Timer
function initializeCountdown() {
    const targetDate = new Date("2024-12-31T23:59:59Z").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const timeRemaining = targetDate - now;

        if (timeRemaining > 0) {
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = days.toString().padStart(2, "0");
            document.getElementById("hours").innerText = hours.toString().padStart(2, "0");
            document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0");
            document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0");
        } else {
            clearInterval(timer);
        }
    }

    const timer = setInterval(updateCountdown, 1000);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.hash.replace('#', '') || 'home';
    setActiveNavItem(currentPage);

    initializeCarousels();
    initializeCountdown();
});
