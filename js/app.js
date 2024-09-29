
//Order Management Section
//Add Customer Modal in place-order.html

//Date and Time
let currentdate = new Date(); // for current date
let datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
document.getElementById("DateandTime").innerHTML = datetime;


const customerArray = [{
  customerID : 1,
  firstName: "Saman",
  lastName: "Silva",
  occupation: "Software Engineer",
  location: "Kandy",
  email: "saman@gmail.com",
  phoneNumber: "0776775195",
  additionalInfo: "",
},
{
  customerID : 2,
  firstName: "Anura",
  lastName: "Perera",
  occupation: "Teacher",
  location: "Colombo",
  email: "anura@gmail.com",
  phoneNumber: "0771234567",
  additionalInfo: "",
},

];

document.getElementById("orderID").innerHTML = "P00" + (customerArray.length+1);

let phoneNumber = document.getElementById("place_order_phoneNumber");


phoneNumber.addEventListener("keypress", function(event) {
  if (event.keyCode == 13){
    event.preventDefault();
    searchCustomerbyPhoneNumber();
  }
});

function searchCustomerbyPhoneNumber(){
  let number = document.getElementById("place_order_phoneNumber").value;
  for (let i = 0; i < customerArray.length; i++) {
    if (customerArray[i].phoneNumber === number) {
      document.getElementById("place_order_customerName").value = customerArray[i].firstName + " " + customerArray[i].lastName;
      document.getElementById("place_order_location").value = customerArray[i].location;
    }
  }
}


//Stop Refreshing the page
let form = document.getElementById("customerForm");
function handleForm(event){event.preventDefault();}
form.addEventListener('submit',handleForm);

function addCustomer() {
  const customerID = customerArray.length + 1;
  const firstName = document.getElementById("modalFirstName").value;
  const lastName = document.getElementById("modalLastName").value;
  const occupation = document.getElementById("modalOccupation").value;
  const location = document.getElementById("modalLocation").value;
  const email = document.getElementById("modalEmail").value;
  const phoneNumber = document.getElementById("modalPhoneNumber").value;
  const additionalInfo = document.getElementById("modalAdditionalInfomation").value;

  let tempCustomerArray = {
    customerID:customerID,
    firstName:firstName, 
    lastName:lastName, 
    occupation:occupation,
    location:location,
    email: email,
    phoneNumber: phoneNumber, 
    additionalInfo:additionalInfo
  };
  customerArray.push(tempCustomerArray);
  console.log(customerArray.length);
  console.log(customerArray[customerArray.length - 1].firstName);  
  clearCustomerForm();
}

function clearCustomerForm(){
  document.getElementById("modalFirstName").value = "";
  document.getElementById("modalLastName").value = "";
  document.getElementById("modalOccupation").value = "";
  document.getElementById("modalLocation").value = "";
  document.getElementById("modalEmail").value = "";
  document.getElementById("modalPhoneNumber").value = "";
  document.getElementById("modalAdditionalInfomation").value = "";
}


function showAddCustomerModal() {
  const myModal = new bootstrap.Modal("#modalAddCustomer");
  myModal.show();
}

function showCartModal() {
  const myModal = new bootstrap.Modal("#modalCart");
  myModal.show();
}

function btnClearClicked(){
  document.getElementById("place_order_customerName").value = "";
  document.getElementById("place_order_location").value = "";
  document.getElementById("place_order_phoneNumber").value = "";
  document.getElementById("additionalNotes").value = "";
  document.getElementById("place_order_phoneNumber").focus();

  console.log(customerArray.length);
  
}

//Handle Product-Cards
const productList = {
  "Burgers": [
    { itemCode: "B1001", name: "Classic Burger", price: 1500.00, discount: 0, img: "../assets/images/Burger-Category/Classic Burger (Large).webp" },
    { itemCode: "B1002", name: "Turkey Burger", price: 1600.00,discount: 15, img: "../assets/images/Burger-Category/turkey-burger.png" },
    { itemCode: "B1003", name: "Chicken Burger", price: 1400.00,discount: 0, img: "../assets/images/Burger-Category/chicken-burger.webp" },
    { itemCode: "B1004", name: "Cheese Chicken Burger", price: 1000.00, discount: 5,img: "../assets/images/Burger-Category/cheese burger.webp" },
    { itemCode: "B1005", name: "Crispy Chicken Burger", price: 1200.00, discount: 0,img: "../assets/images/Burger-Category/Crispy Chicken Burger.webp"},
    { itemCode: "B1006", name: "Special Olive Burger", price: 1800.00, discount: 5,img: "../assets/images/Burger-Category/olive-burger.webp"},
    { itemCode: "B1007", name: "Bacon Burger", price: 650.00, discount: 0,img: "../assets/images/Burger-Category/becon-burger.webp" },
    { itemCode: "B1008", name: "Shawarma Burger", price: 800.00, discount: 12,img: "../assets/images/Burger-Category/shawarma-burger.webp"},
    { itemCode: "B1009", name: "Double Cheese Burger", price: 1250.00, discount: 20,img: "../assets/images/Burger-Category/Double-Cheese Burger.webp"},
    { itemCode: "B1010", name: "Paneer Burger", price: 900.00, discount: 0,img: "../assets/images/Burger-Category/Paneer Burger.webp"}
],
"Submarines": [
    { itemCode: "B10011", name: "Double Cheese Chicken Submarine", price: 1900.00,discount: 16, img: "../assets/images/Submarine-Category/Double Cheese Chicken Submarine.webp"},
    { itemCode: "B10012", name: "MOS Special Submarine", price: 3000.00,discount: 0, img: "../assets/images/Submarine-Category/MOS Special Submarine.webp" },
    { itemCode: "B10013", name: "Special Horgie Submarine", price: 2300.00,discount: 0, img: "../assets/images/Submarine-Category/Special Horgie Submarine.webp"},
    { itemCode: "B10014", name: "Cheese Submarine", price: 2200.00,discount: 0, img: "../assets/images/Submarine-Category/Cheese Submarine.webp" },  
    { itemCode: "B10015", name: "Chicken Submarine", price: 2000.00,discount: 0, img: "../assets/images/Submarine-Category/chickensub.png" },
    { itemCode: "B10016", name: "Grinder Submarine", price: 2300.00,discount: 0, img: "../assets/images/Submarine-Category/Grinder Submarine.webp" },
    { itemCode: "B10017", name: "Crispy Chicken Submarine", price: 1500.00,discount: 0, img: "../assets/images/Submarine-Category/Crispy Chicken Submarine (Large).jpg" }
],
"Pasta": [
    { itemCode: "B10018", name: "Chicken Cheese Pasta", price: 1600.00,discount: 15, img: "../assets/images/Pasta-Category/Chicken Chesese pasta.png" },
    { itemCode: "B10019", name: "Chicken Penne Pasta", price: 1700.00,discount: 0, img: "../assets/images/Pasta-Category/chicken panne.png" },
    { itemCode: "B10020", name: "Ground Turkey Pasta Bake", price: 2900.00,discount: 10, img: "../assets/images/Pasta-Category/Ground Turkey Pasta Bake.webp" },
    { itemCode: "B10021", name: "Creamy Shrimp Pasta", price: 2000.00,discount: 0, img: "../assets/images/Pasta-Category/Creamy Shrimp Pasta.webp" },
    { itemCode: "B10022", name: "Lemon Butter Pasta", price: 1950.00,discount: 0, img: "../assets/images/Pasta-Category/Lemon Butter Pasta.webp" },
    { itemCode: "B10023", name: "Tagliatelle Chicken Pasta", price: 2400.00,discount: 1, img: "../assets/images/Pasta-Category/Tagliatelle Pasta.png" },
    { itemCode: "B10024", name: "Baked Ravioli", price: 2000.00,discount: 1, img: "../assets/images/Pasta-Category/Baked Ravioli.webp" }
],
"Fries": [
    { itemCode: "B10025", name: "Steak Fries", price: 1200.00,discount: 0, img: "../assets/images/Fries-Category/Steak Fries.png" },
    { itemCode: "B10026", name: "French Fries", price: 800.00,discount: 0, img: "../assets/images/Fries-Category/French Fries.webp" },
    { itemCode: "B10027", name: "Potato Fries", price: 600.00,discount: 0, img: "../assets/images/Fries-Category/Sweet Potato Fries.webp" }
],

"Chicken":[
    { itemCode: "B10028", name: "Fried Chicken", price: 1200.00,discount: 0, img: "../assets/images/Chicken-Category/Fried Chicken.png" },
    { itemCode: "B10029", name: "BBQ Chicken", price: 2100.00,discount: 0, img: "../assets/images/Chicken-Category/BBQ Chicken.png" },
    { itemCode: "B10030", name: "Devilled Chicken", price: 900.00,discount: 0, img: "../assets/images/Chicken-Category/Devilled Chicken.webp" },
    { itemCode: "B10031", name: "Hot Wings", price: 2400.00,discount: 5, img: "../assets/images/Chicken-Category/Hot Wings.png" }
],
"Beverages": [
    { itemCode: "B10032", name: "Pepsi (330ml)", price: 990.00,discount: 2, img: "../assets/images/Bevarages-Category/Pepsi.webp" },
    { itemCode: "B10033", name: "Coca-Cola (330ml)", price: 1230.00,discount: 0, img: "../assets/images/Bevarages-Category/Coca-Cola.webp" },
    { itemCode: "B10034", name: "Sprite (330ml)", price: 1500.00,discount: 3, img: "../assets/images/Bevarages-Category/Sprite.webp" },
    { itemCode: "B10035", name: "Mirinda (330ml)", price: 850.00,discount: 7, img: "../assets/images/Bevarages-Category/Mirinda.webp" }
]
};


let currentCategory = "Burgers";
function renderProductList(category) {
    currentCategory = category;
    const productListContainer = document.getElementById('product-list');
    productListContainer.innerHTML = '';

        if(productList[category]){
          productList[category].forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.className = 'col-md-4 mb-3';
            productCard.innerHTML = `
                <div class="card product-card align-items-center" onclick="addToOrderList(${index})">
                    <img src="${product.img}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">LKR ${product.price.toFixed(2)}</p>
                    </div>
                </div>
            `;
            productListContainer.appendChild(productCard);
        });
        }  
}
const orderList = [];

function addToOrderList(index) {
  const product = productList[currentCategory][index];
  const orderItem = orderList.find(item => item.itemCode === product.itemCode);
  if (orderItem) {
      orderItem.quantity += 1;
  } else {
      orderList.push({ ...product, quantity: 1 });
  }
  updateOrderList();
}

function updateOrderList() {
  const orderListContainer = document.getElementById('order-list');
  orderListContainer.innerHTML = '';

  let subtotal = 0;
  let totalItems = 0;
  let discount = 0;
  let total = 0;

  orderList.forEach((item, index) => {
      if (item.quantity > 0) {
          subtotal += item.price * item.quantity;
          totalItems += item.quantity;
          discount += (item.price * item.quantity) * (item.discount / 100);

          const orderItem = document.createElement('div');
          orderItem.className = 'order-item d-flex justify-content-between m-3';
          orderItem.innerHTML = `
              <img src="${item.img}" alt="${item.name}">
              <div>
                  <p>${item.name}</p>
                  <p>${item.itemCode}</p>
              </div>
              <div>
                  <button class="btn btn-sm btn-secondary" onclick="changeQuantity(${index}, -1)">-</button>
                  <span>${item.quantity}</span>
                  <button class="btn btn-sm btn-secondary" onclick="changeQuantity(${index}, 1)">+</button>
              </div>
              <p>LKR ${(item.price * item.quantity).toFixed(2)}</p>
              <button type="button" class="btnDelete m-1 pb-3" onclick="removeItem(${index})"><img src="../assets/icons/delete.svg" alt="Delete"></button>
          `;
          orderListContainer.appendChild(orderItem);
      }
  });

  document.getElementById('total-items').innerText = totalItems;
  document.getElementById('subtotal').innerText = `LKR ${subtotal.toFixed(2)}`;
  
  document.getElementById('lblDiscount').innerText = `LKR ${discount.toFixed(2)}`;
  total = subtotal - discount;
  document.getElementById('total').innerText = `LKR ${total.toFixed(2)}`;
  
}

function changeQuantity(index, change) {
  orderList[index].quantity += change;
  if (orderList[index].quantity < 0) {
      orderList[index].quantity = 0;
  }
  updateOrderList();
}

function removeItem(index) {
  orderList[index].quantity = 0;
  updateOrderList();
}

function clearOrderList() {
  orderList.length = 0;
  updateOrderList();
}

//Place Order
function btnPlaceOrderClicked() {
  console.log("clicked");
  const snipper = (document.getElementById("spinner").style.visibility =
    "hidden");
}

document.addEventListener('DOMContentLoaded', () => {
  renderProductList('Burgers');
  updateOrderList();
  loadMenuTable();
});

//menu.html
function showAddMenuItemModal() {
  const myModal = new bootstrap.Modal("#modalAddProduct");
  myModal.show();
}

//Menu Management

//Load Menu Table
function loadMenuTable(){
    let table = document.getElementById('tblMenu');
  
    let body = ` <tr>
                    <th><input type="checkbox"></th>
                    <th>Item Code</th>
                    <th >Product Name</th>
                    <th>Category</th>
                    <th>Price LKR</th>
                    <th>Discount %</th>
                    <th>Actions</th>
                </tr>`;
  
    table.innerHTML = '';
  
    console.log(productList['Burgers']);
}



