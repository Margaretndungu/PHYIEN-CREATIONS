// ------------------- Load products into table -------------------
async function loadProducts() {
    const res = await fetch("/api/products");
    const products = await res.json();
    const tbody = document.getElementById("productTableBody");
    tbody.innerHTML = "";
    products.forEach((product, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
                <img src="${product.image}" width="60" style="cursor:pointer;" onclick='viewProduct(${JSON.stringify(product)})'>
            </td>
            <td>
                <button class="edit-btn" onclick="editProduct(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// ------------------- Add Product -------------------
async function addProduct() {
    const form = document.getElementById("productForm");
    form.reset();
    form.dataset.index = ""; // empty index means add
    document.getElementById("modalTitle").innerText = "Add Product";
    document.getElementById("productModal").style.display = "block";
}

// ------------------- Edit Product -------------------
async function editProduct(index) {
    const res = await fetch("/api/products");
    const products = await res.json();
    const product = products[index];

    const form = document.getElementById("productForm");
    form.name.value = product.name;
    form.price.value = product.price;
    form.dataset.index = index;
    document.getElementById("modalTitle").innerText = "Edit Product";
    document.getElementById("productModal").style.display = "block";
}

// ------------------- Delete Product -------------------
async function deleteProduct(index) {
    if (confirm("Are you sure you want to delete this product?")) {
        await fetch(`/api/products/${index}`, { method: "DELETE" });
        loadProducts();
    }
}

// ------------------- Modal Form Submission -------------------
document.getElementById("productForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const index = form.dataset.index;

    let url = "/api/products";
    let method = "POST";

    if (index) {
        url += `/${index}`;
        method = "PUT";
    }

    await fetch(url, { method, body: formData });
    document.getElementById("productModal").style.display = "none";
    loadProducts();
});

// ------------------- Close modal -------------------
document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("productModal").style.display = "none";
});

// ------------------- Add button -------------------
document.getElementById("addProductBtn").addEventListener("click", addProduct);

// ------------------- NEW: View Product Modal -------------------
function viewProduct(product) {
    const modal = document.getElementById("viewProductModal");
    document.getElementById("viewProductImage").src = product.image;
    document.getElementById("viewProductName").innerText = product.name;
    document.getElementById("viewProductPrice").innerText = product.price;
    modal.style.display = "block";
}

// Close view modal
document.getElementById("closeViewModal").addEventListener("click", () => {
    document.getElementById("viewProductModal").style.display = "none";
});

// ------------------- Load products on page load -------------------
loadProducts();
