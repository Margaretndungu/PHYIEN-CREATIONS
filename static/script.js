console.log("PHYIEN CREATIONS loaded successfully");

// Modal elements
const modal = document.getElementById("productModal");
const modalImg = document.querySelector(".modal-img");
const modalTitle = document.querySelector(".modal-title");
const modalPrice = document.querySelector(".modal-price");
const modalDesc = document.querySelector(".modal-description");
const buyBtn = document.querySelector(".buy-btn");
const closeBtn = document.querySelector(".close");

// WhatsApp number (replace with your number in international format)
const phoneNumber = "254707211592";

// Product data array matching your HTML collection
const products = [
    { title: "African top", price: "KES 1,500", description: "Beautiful African top with vibrant colors.", img: "pic1.jfif" },
    { title: "African topper", price: "KES 1,500", description: "Stylish African topper perfect for casual wear.", img: "pic2.jfif" },
    { title: "Cute", price: "KES 2,000", description: "Adorable outfit for all occasions.", img: "pic3.jfif" },
    { title: "Kitenge dress", price: "KES 2,500", description: "Classic Kitenge dress with modern touch.", img: "pic4.jfif" },
    { title: "Africa top", price: "KES 1,500", description: "Elegant Africa top for casual or formal.", img: "pic5.jfif" },
    { title: "Dress", price: "KES 2,300", description: "Beautiful dress with premium fabric.", img: "pic6.jfif" },
    { title: "Top", price: "KES 1,500", description: "Comfortable top with timeless design.", img: "pic7.jfif" },
    { title: "Vintage Top", price: "KES 1,600", description: "Classic vintage style top.", img: "pic8.jfif" },
    { title: "Top", price: "KES 1,800", description: "Premium quality top for everyday wear.", img: "pic9.jfif" }
];

// Make product items clickable for modal
document.querySelectorAll(".item").forEach((item, index) => {
    item.addEventListener("click", () => {
        const product = products[index];

        // Set modal content
        modalImg.style.backgroundImage = `url(${product.img})`;
        modalTitle.textContent = product.title;
        modalPrice.textContent = product.price;
        modalDesc.textContent = product.description;

        // WhatsApp link with pre-filled message
        const message = `Hello, I would like to buy: ${product.title} for ${product.price}`;
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

// ------------------- Hamburger Menu -------------------

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active'); 
    hamburger.classList.toggle('hide'); 
});

