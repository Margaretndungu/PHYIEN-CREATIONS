console.log("PHYIEN CREATIONS loaded successfully");

// Modal elements
const modal = document.getElementById("productModal");
const modalImg = document.querySelector(".modal-img");
const modalTitle = document.querySelector(".modal-title");
const modalPrice = document.querySelector(".modal-price");
const modalDesc = document.querySelector(".modal-description");
const buyBtn = document.querySelector(".buy-btn");
const closeBtn = document.querySelector(".close");

// Make product items clickable for modal
document.querySelectorAll(".item").forEach((item, index) => {
    item.addEventListener("click", () => {
        const product = products[index];

        // Set modal content
        modalImg.style.backgroundImage = `url(${product.image})`;
        modalTitle.textContent = product.name;
        modalPrice.textContent = product.price;
        modalDesc.textContent = product.description || "";

        // WhatsApp link with pre-filled message
        const message = `Hello, I would like to buy: ${product.name} for ${product.price}`;
        buyBtn.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        // Show modal
        modal.style.display = "block";
    });
});

// Close modal when X is clicked
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close modal if clicked outside modal content
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active'); 
    hamburger.classList.toggle('hide'); 
});
