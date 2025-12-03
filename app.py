from flask import Flask, render_template, request, jsonify, redirect, url_for, session
import json, os
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.secret_key = "your_secret_key_here"  # Replace with a strong secret key

ADMIN_PASSWORD = "phyien2001"
DATA_FILE = "products.json"
UPLOAD_FOLDER = "static/images"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "jfif", "gif"}

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# ---------------- Helper functions ----------------
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def load_products():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r") as f:
        return json.load(f)

def save_products(products):
    with open(DATA_FILE, "w") as f:
        json.dump(products, f, indent=4)

# ---------------- Login routes ----------------
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        password = request.form.get("password")
        if password == ADMIN_PASSWORD:
            session["logged_in"] = True
            return redirect(url_for("dashboard"))
        return render_template("login.html", error="Incorrect password")
    return render_template("login.html")

@app.route("/logout")
def logout():
    session.pop("logged_in", None)
    return redirect(url_for("login"))

# ---------------- Dashboard route ----------------
@app.route("/dashboard")
def dashboard():
    if not session.get("logged_in"):
        return redirect(url_for("login"))
    products = load_products()
    return render_template("dashboard.html", products=products)

# ---------------- Main website ----------------
@app.route("/")
def index():
    products = load_products()
    return render_template("index.html", products=products)

# ---------------- API routes ----------------
@app.route("/api/products", methods=["GET"])
def get_products():
    return jsonify(load_products())

# Add product with image upload
@app.route("/api/products", methods=["POST"])
def add_product():
    # Check if image is uploaded
    file = request.files.get("image")
    if not file or not allowed_file(file.filename):
        return jsonify({"error": "Invalid or missing image file"}), 400
    
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    # Get other product data
    name = request.form.get("name")
    price = request.form.get("price")

    data = {
        "name": name,
        "price": price,
        "image": f"static/images/{filename}"
    }

    products = load_products()
    products.append(data)
    save_products(products)
    return jsonify({"success": True})

# Update product (can also update image)
@app.route("/api/products/<int:index>", methods=["PUT"])
def update_product(index):
    products = load_products()
    if not (0 <= index < len(products)):
        return jsonify({"error": "Invalid index"}), 400

    product = products[index]
    name = request.form.get("name")
    price = request.form.get("price")

    # Check if new image is uploaded
    file = request.files.get("image")
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(filepath)
        product["image"] = f"static/images/{filename}"

    product["name"] = name
    product["price"] = price
    products[index] = product
    save_products(products)
    return jsonify({"success": True})

# Delete product
@app.route("/api/products/<int:index>", methods=["DELETE"])
def delete_product(index):
    products = load_products()
    if 0 <= index < len(products):
        products.pop(index)
        save_products(products)
        return jsonify({"success": True})
    return jsonify({"error": "Invalid index"}), 400

# ---------------- Run server ----------------
if __name__ == "__main__":
    app.run(debug=True)
