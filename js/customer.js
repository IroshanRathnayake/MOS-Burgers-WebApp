import { customerArray } from "./data.js";

let customers = customerArray;

console.log(customers);

document
  .getElementById("btnAddCustomer")
  .addEventListener("click", showAddCustomerModal);

function showAddCustomerModal() {
  const myModal = new bootstrap.Modal("#modalAddCustomer");
  myModal.show();
}

//Render Customer List
function renderCustomerList() {
  const customerListContainer = document.getElementById("customer-list");
  customerListContainer.innerHTML = "";

  if (customers) {
    customers.forEach((customer, index) => {
      console.log(customer);

      const customerCard = document.createElement("div");
      customerCard.className = "col-lg-3 col-md-4 col-sm-12 mb-3 mt-4";
      customerCard.innerHTML = `
                <div class="card customer-card align-items-center">
                    <img src="${customer.img}" class="card-img-top" alt="${customer.name}">
                    <div class="card-body">
                        <h5 class="card-title">${customer.firstName} ${customer.lastName}</h5>
                        <p class="card-text">${customer.phoneNumber}</p>
                        <div class="row">
                          <div class="col-12">
                              <div class="action-icons d-flex justify-content-center">
                            <img src="../assets/icons/eye.svg" alt="" id="btnView-${index}">
                            <img src="../assets/icons/edit.svg" alt="" id="btnEdit-${index}">
                            <img src="../assets/icons/trash.svg" alt="" id="btnDelete-${index}">
                          </div>
                          </div>
                        </div>
                    </div>
                </div>
            `;
      customerListContainer.appendChild(customerCard);

      document
        .getElementById(`btnView-${index}`)
        .addEventListener("click", () => loadCustomerDetails(index));
      document
        .getElementById(`btnEdit-${index}`)
        .addEventListener("click", () => loadCustomerToModal(index));
      document
        .getElementById(`btnDelete-${index}`)
        .addEventListener("click", () => deleteCustomer(index));
    });
  }
}

//Load Customer Details
function loadCustomerDetails(index) {
  const customer = customers[index];

  if (customer) {
    document.getElementById("viewCustomerImage").src = customer.img;
    document.getElementById("viewCustomerID").textContent = customer.customerID;
    document.getElementById("viewCustomerFirstName").textContent =
      customer.firstName;
    document.getElementById("viewCustomerLastName").textContent =
      customer.lastName;
    document.getElementById("viewCustomerOccupation").textContent =
      customer.occupation;
    document.getElementById("viewCustomerLocation").textContent =
      customer.location;
    document.getElementById("viewCustomerEmail").textContent = customer.email;
    document.getElementById("viewCustomerPhone").textContent =
      customer.phoneNumber;
    document.getElementById("viewCustomerAdditionalInfo").textContent =
      customer.additionalInfo;

    document.getElementById("viewCustomerGender").textContent=customer.gender;

    new bootstrap.Modal(document.getElementById("modalViewCustomer")).show();
  } else {
    console.error("Customer not found");
  }
}

//Load product details to edit
function loadCustomerToModal(index) {
  const customer = customers[index];

  const customerID = customerArray.length + 1;
  const firstName = document.getElementById("modalFirstName").value = customer.firstName;
  const lastName = document.getElementById("modalLastName").value = customer.lastName;
  const occupation = document.getElementById("modalOccupation").value = customer.occupation;
  const gender = document.getElementById("modalGender").value = customer.gender;
  const location = document.getElementById("modalLocation").value = customer.location;
  const email = document.getElementById("modalEmail").value = customer.email;
  const phoneNumber = document.getElementById("modalPhoneNumber").value = customer.phoneNumber;
  const additionalInfo = document.getElementById(
    "modalAdditionalInfomation"
  ).value = customer.additionalInfo;


  const customerModal = new bootstrap.Modal("#modalAddCustomer");
  customerModal.show();
}

//Search Customers By Name
function searchCustomers() {
  const searchTerm = document.getElementById("search-bar").value.toLowerCase();
  const customerListContainer = document.getElementById("customer-list");
  customerListContainer.innerHTML = "";

  if (customers) {
    const filteredCustomers = customers.filter((customer) =>
      customer.phoneNumber.toLowerCase().includes(searchTerm)
    );

    // Render the filtered customers
    filteredCustomers.forEach((customer, index) => {
        const customerCard = document.createElement("div");
        customerCard.className = "col-lg-3 col-md-4 col-sm-12 mb-3 mt-4";
        customerCard.innerHTML = `
                  <div class="card customer-card align-items-center">
                      <img src="${customer.img}" class="card-img-top" alt="${customer.name}">
                      <div class="card-body">
                          <h5 class="card-title">${customer.firstName} ${customer.lastName}</h5>
                          <p class="card-text">${customer.phoneNumber}</p>
                          <div class="row">
                            <div class="col-12">
                                <div class="action-icons d-flex justify-content-center">
                              <img src="../assets/icons/eye.svg" alt="" id="btnView-${index}">
                              <img src="../assets/icons/edit.svg" alt="" id="btnEdit-${index}">
                              <img src="../assets/icons/trash.svg" alt="" id="btnDelete-${index}">
                            </div>
                            </div>
                          </div>
                      </div>
                  </div>
              `;
        customerListContainer.appendChild(customerCard);
  
        document
          .getElementById(`btnView-${index}`)
          .addEventListener("click", () => loadCustomerDetails(index));
        document
          .getElementById(`btnEdit-${index}`)
          .addEventListener("click", () => loadCustomerToModal(index));
        document
          .getElementById(`btnDelete-${index}`)
          .addEventListener("click", () => deleteCustomer(index));
    });
  }
}

document.getElementById("search-bar").addEventListener("input", searchCustomers);

document.getElementById("btnAddCustomerSubmit").addEventListener("click", addNewProduct);

//Add New Customer
function addNewProduct(event) {
    event.preventDefault();
  const customerID = customers.length + 1;
  const firstName = document.getElementById("modalFirstName").value;
  const lastName = document.getElementById("modalLastName").value;
  const occupation = document.getElementById("modalOccupation").value;
  const gender = document.getElementById("modalGender");
  const location = document.getElementById("modalLocation").value;
  const email = document.getElementById("modalEmail").value;
  const phoneNumber = document.getElementById("modalPhoneNumber").value;
  const additionalInfo = document.getElementById(
    "modalAdditionalInfomation"
  ).value;
  const customerGender = gender.options[gender.selectedIndex].text;

  console.log(customerGender);
  

  let img ="../assets/images/man.png";
  if(customerGender === "Female"){
    img = "../assets/images/girl.png";
  }

  for(let i = 0; i < customers.length; i++) {

    if(customers[i].phoneNumber === phoneNumber){
      deleteCustomer(i);
    }
  }

  let tempCustomerArray = {
    customerID: customerID,
    img: img,
    firstName: firstName,
    lastName: lastName,
    occupation: occupation,
    gender: customerGender,
    location: location,
    email: email,
    phoneNumber: phoneNumber,
    additionalInfo: additionalInfo,
  };

  console.log(tempCustomerArray);
  
    //Add Product to Array
    addCustomer(tempCustomerArray);
  
    const myModal = new bootstrap.Modal("#modalAddProduct");
    myModal.hide();
  }



function showSuccessModal() {
    const successModal = new bootstrap.Modal(
      document.getElementById("successAlertModal")
    );
    successModal.show();
  }
  
  //Update Customer List
  function updateCustomerList(newCustomer, index) {
    // Render the new customer
    const customerListContainer = document.getElementById("customer-list");
    const customerCard = document.createElement("div");

    customerCard.className = "col-lg-3 col-md-4 col-sm-12 mb-3 mt-4";
    customerCard.innerHTML = `
                  <div class="card customer-card align-items-center">
                      <img src="${newCustomer.img}" class="card-img-top" alt="${newCustomer.name}">
                      <div class="card-body">
                          <h5 class="card-title">${newCustomer.firstName} ${newCustomer.lastName}</h5>
                          <p class="card-text">${newCustomer.phoneNumber}</p>
                          <div class="row">
                            <div class="col-12">
                                <div class="action-icons d-flex justify-content-center">
                              <img src="../assets/icons/eye.svg" alt="" id="btnView-${index}">
                              <img src="../assets/icons/edit.svg" alt="" id="btnEdit-${index}">
                              <img src="../assets/icons/trash.svg" alt="" id="btnDelete-${index}">
                            </div>
                            </div>
                          </div>
                      </div>
                  </div>
              `;
        customerListContainer.appendChild(customerCard);
  
        document
          .getElementById(`btnView-${index}`)
          .addEventListener("click", () => loadCustomerDetails(index));
        document
          .getElementById(`btnEdit-${index}`)
          .addEventListener("click", () => loadCustomerToModal(index));
        document
          .getElementById(`btnDelete-${index}`)
          .addEventListener("click", () => deleteCustomer(index));
  
    showSuccessModal();
  
    // alert("Customer added successfully!");
  }
  


// save customers in Local Storage
function saveCustomersToLocalStorage() {
    localStorage.setItem("customerList", JSON.stringify(customers));
  }
  
  // Add a customer and save to localStorage
  function addCustomer(newCustomer) {
    customers.push(newCustomer);
    let index = customers.length - 1;
    saveCustomersToLocalStorage();
    updateCustomerList(newCustomer, index);
  }
  
  // Delete customer
  function deleteCustomer(index) {
    customers.splice(index, 1);
    saveCustomersToLocalStorage();
    renderCustomerList();
  }
  
  // Load customers from local storage
  function loadCustomersFromLocalStorage() {
    const storedCustomers = localStorage.getItem("customerList");
    if (storedCustomers) {
      customers = JSON.parse(storedCustomers);
    }
  }
  

window.onload = function () {
    loadCustomersFromLocalStorage();
  renderCustomerList();
};
