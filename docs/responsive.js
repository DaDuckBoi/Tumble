document.addEventListener("DOMContentLoaded", () => {
    const MIN_WIDTH = 700;
    const MAX_WIDTH = 1200;

    // Check if the screen width is in the responsive range
    if (window.innerWidth >= MIN_WIDTH && window.innerWidth <= MAX_WIDTH) {
        const homepage = document.querySelector(".Homepage");
        const cardContainer = document.querySelector(".card-container");

        // Add a wrapper for the card slider and arrows
        const wrapper = document.createElement("div");
        wrapper.classList.add("card-slider-wrapper");

        // Move the card container inside the wrapper
        homepage.insertBefore(wrapper, cardContainer);
        wrapper.appendChild(cardContainer);

        // Create left and right arrows
        const leftArrow = document.createElement("button");
        leftArrow.classList.add("slider-arrow", "left-arrow");
        leftArrow.textContent = "❮";

        const rightArrow = document.createElement("button");
        rightArrow.classList.add("slider-arrow", "right-arrow");
        rightArrow.textContent = "❯";

        // Add the arrows to the wrapper
        wrapper.appendChild(leftArrow);
        wrapper.appendChild(rightArrow);

        // Apply scrolling functionality to the arrows
        leftArrow.addEventListener("click", () => {
            cardContainer.scrollBy({
                left: -200, // Scroll left by 200px
                behavior: "smooth",
            });
        });

        rightArrow.addEventListener("click", () => {
            cardContainer.scrollBy({
                left: 200, // Scroll right by 200px
                behavior: "smooth",
            });
        });
    }
});
