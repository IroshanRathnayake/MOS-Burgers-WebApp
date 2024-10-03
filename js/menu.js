import { productList } from "./data.js";

let products = productList;

export function showAddMenuItemModal() {
  const myModal = new bootstrap.Modal("#modalAddProduct");
  myModal.show();
}

document
  .getElementById("btnAddNewProduct")
  .addEventListener("click", showAddMenuItemModal);

//Currurent Category to load
let currentCategory = "Burgers";

//Render Product List
function renderProductList(category) {
  currentCategory = category;
  const productListContainer = document.getElementById("product-list");
  productListContainer.innerHTML = "";

  if (products[category]) {
    products[category].forEach((product, index) => {
      const productCard = document.createElement("div");
      productCard.className = "col-md-3 mb-3";
      productCard.innerHTML = `
                <div class="card product-card align-items-center" onclick="addToOrderList(${index})">
                    <img src="${product.img}" class="card-img-top" alt="${
        product.name
      }">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text product-price">LKR ${product.price.toFixed(
                          2
                        )}</p>
                        <div class="row">
                          <div class="col-12">
                              <div class="action-icons d-flex justify-content-center">
                            <img src="../assets/icons/eye.svg" alt="" onclick="showAddMenuItemModal()" id="btnView">
                            <img src="../assets/icons/edit.svg" alt="" id="btnEdit">
                            <img src="../assets/icons/trash.svg" alt="" id="btnDelete">
                          </div>
                          </div>
                        </div>
                    </div>
                </div>
            `;
      productListContainer.appendChild(productCard);
    });
  }
}

//Search Products By Name
function searchProducts() {
  const searchTerm = document.getElementById("search-bar").value.toLowerCase();
  const productListContainer = document.getElementById("product-list");
  productListContainer.innerHTML = ""; // Clear the current product list

  if (products[currentCategory]) {
    const filteredProducts = products[currentCategory].filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );

    // Render the filtered products
    filteredProducts.forEach((product, index) => {
      const productCard = document.createElement("div");
      productCard.className = "col-md-3 mb-3";
      productCard.innerHTML = `
                <div class="card product-card align-items-center" onclick="addToOrderList(${index})">
                    <img src="${product.img}" class="card-img-top" alt="${
        product.name
      }">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text product-price">LKR ${product.price.toFixed(
                          2
                        )}</p>
                        <div class="row">
                          <div class="col-12">
                              <div class="action-icons d-flex justify-content-center">
                            <img src="../assets/icons/eye.svg" alt="" onclick="showAddMenuItemModal()">
                            <img src="../assets/icons/edit.svg" alt="">
                            <img src="../assets/icons/trash.svg" alt="">
                          </div>
                          </div>
                        </div>
                    </div>
                </div>
            `;
      productListContainer.appendChild(productCard);
    });
  }
}

document.getElementById("search-bar").addEventListener("input", searchProducts);

//Image Preview
let uploadedImage = "";

function previewImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("modalProductImage").src = e.target.result;
      document.getElementById("modalProductImage").style.display = "block";
      uploadedImage = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

document
  .getElementById("modalProductImage")
  .addEventListener("change", previewImage);

//Add New Product
function addNewProduct() {
  // Get values from the form inputs
  const productCode = document.getElementById("modalItemCode").value;
  const productName = document.getElementById("modalProductName").value;
  const productPrice = parseFloat(document.getElementById("modalPrice").value);
  const category = document.getElementById("modalProductCategory");
  const discount = parseFloat(document.getElementById("modalDiscount").value);

  const productCategory = category.options[category.selectedIndex].text;
  // Create a new product object
  const newProduct = {
    itemCode: productCode,
    name: productName,
    price: productPrice,
    discount: discount,
    img: uploadedImage,
  };

  if (!products[productCategory]) {
    products[productCategory] = [];
  }

  currentCategory = productCategory;

  //Add Product to Array
  addProduct(newProduct);

  const myModal = new bootstrap.Modal("#modalAddProduct");
  myModal.hide();
}
function showSuccessModal() {
  const successModal = new bootstrap.Modal(
    document.getElementById("successAlertModal")
  );
  successModal.show();
}

//Update Product List
function updateProductList(newProduct, productCategory) {
  // Render the new product
  const productListContainer = document.getElementById("product-list");
  const productCard = document.createElement("div");
  productCard.className = "col-md-3 mb-3";
  productCard.innerHTML = `
      <div class="card product-card align-items-center" onclick="addToOrderList(${
        products[productCategory].length - 1
      })">
          <img src="${newProduct.img}" class="card-img-top" alt="${
    newProduct.name
  }">
          <div class="card-body">
              <h5 class="card-title">${newProduct.name}</h5>
              <p class="card-text product-price">LKR ${newProduct.price.toFixed(
                2
              )}</p>
              <div class="row">
                <div class="col-12">
                    <div class="action-icons d-flex justify-content-center">
                      <img src="../assets/icons/eye.svg" alt="" onclick="showAddMenuItemModal()">
                      <img src="../assets/icons/edit.svg" alt="">
                      <img src="../assets/icons/trash.svg" alt="">
                    </div>
                </div>
              </div>
          </div>
      </div>
  `;
  productListContainer.appendChild(productCard);

  // alert("Product added successfully!");
  showSuccessModal();
}

// save Products in Local Storage
function saveProductsToLocalStorage() {
  localStorage.setItem("productList", JSON.stringify(products));
}

// Add a product and save to localStorage
function addProduct(newProduct) {
  products[currentCategory].push(newProduct);
  saveProductsToLocalStorage();
  updateProductList(newProduct, currentCategory);
}


// Delete product
function deleteProduct(index) {
  products[currentCategory].splice(index, 1);
  saveProductsToLocalStorage();
  renderProductList(currentCategory);
}

// Load produts from local storage
function loadProductsFromLocalStorage() {
  const storedProducts = localStorage.getItem("productList");
  if (storedProducts) {
    products = JSON.parse(storedProducts);
  }
}

// load products when page loaded
window.onload = function () {
  loadProductsFromLocalStorage();
  renderProductList(currentCategory);
};

//Stop Refreshing the page
let form = document.getElementById("productForm");
function handleForm(event) {
  event.preventDefault();
}
form.addEventListener("submit", handleForm);

//Add Product Button Action
document
  .getElementById("btnAddProductSubmit")
  .addEventListener("click", addNewProduct);

// Product Category button Action

//Burgers
document
  .getElementById("burgers")
  .addEventListener("click", renderProductList.bind(null, "Burgers"));

//Pasta
document
  .getElementById("pasta")
  .addEventListener("click", renderProductList.bind(null, "Pasta"));

//Submarine
document
  .getElementById("submarine")
  .addEventListener("click", renderProductList.bind(null, "Submarines"));

//Fries
document
  .getElementById("fries")
  .addEventListener("click", renderProductList.bind(null, "Fries"));

//Chicken
document
  .getElementById("chicken")
  .addEventListener("click", renderProductList.bind(null, "Chicken"));

//Beverages
document
  .getElementById("beverages")
  .addEventListener("click", renderProductList.bind(null, "Beverages"));
