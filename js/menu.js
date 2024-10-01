import { productList } from "./data.js";

let products = productList;

export function showAddMenuItemModal() {
  const myModal = new bootstrap.Modal("#modalAddProduct");
  myModal.show();   
}

document.getElementById("btnAddNewProduct").addEventListener('click', showAddMenuItemModal);

//Load Menu Table
export function loadMenuTable() {
  let table = document.getElementById("tblMenu");
  let body = ` <tr>
                      <th><input type="checkbox"></th>
                      <th>Item Code</th>
                      <th >Product Name</th>
                      <th>Category</th>
                      <th>Price LKR</th>
                      <th>Discount %</th>
                      <th>Actions</th>
                  </tr>`;

  table.innerHTML = "";

  let category = "Burgers,Pasta,Fries,Chicken,Beverages".split(",");
  for (let category in products) {
    let categoryList = products[category];
    for (let i = 0; i < categoryList.length; i++) {
      let item = categoryList[i];
      body += `<tr>
                            <td><input type="checkbox"></td>
                            <td>${item.itemCode}</td>
                            <td><img src="${item.img}" alt="Product Image" class="product-img"> ${item.name}</td>
                            <td>${category}</td>
                            <td>${item.price}</td>
                            <td>${item.discount}</td>
                            <td class="action-icons">
                                <img src="../assets/icons/eye.svg" alt="" onclick="showAddMenuItemModal()">
                                <img src="../assets/icons/edit.svg" alt="">
                                <img src="../assets/icons/trash.svg" alt="" onclick="deleteProduct(${item.itemCode})">
                            </td>
                        </tr>`;
    }
  }
  table.innerHTML = body;
}

window.addEventListener('DOMContentLoaded', loadMenuTable);

function deleteProduct(itemCode){
  console.log(itemCode);
}