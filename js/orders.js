import { getOrders } from "./data.js";

let orderList = getOrders();

console.log(orderList);

function renderOrderTable() {
  const tableBody = document.querySelector(".table-body tbody");
  tableBody.innerHTML = "";

  orderList.forEach((order) => {
    console.log(order);

    const row = document.createElement("tr");

    order.img = "../assets/images/man.png";
    row.innerHTML = `
            <td>${order.orderId}</td>
            <td><img src="${order.img}" alt="">${order.customerName}</td>
            <td>${order.phoneNumber}</td>
            <td>${order.date}</td>
            <td><p class="status completed">Completed</p></td>
            <td><strong>LKR ${parseFloat(order.totalAmount).toFixed(
              2
            )}</strong></td>
            <td><a href="reports.html" class="view">View</a></td>
        `;

    tableBody.appendChild(row);
  });
}

window.onload = function () {
  renderOrderTable();
};

//Orders.html Table and Search functionality
const search = document.querySelector(".input-group input"),
  table_rows = document.querySelectorAll(".table-body tbody tr"),
  table_headings = document.querySelectorAll("thead th");

// Searching for specific data
search.addEventListener("input", searchTable);

function searchTable() {
  table_rows.forEach((row, i) => {
    let table_data = row.textContent.toLowerCase(),
      search_data = search.value.toLowerCase();

    row.classList.toggle("hide", table_data.indexOf(search_data) < 0);
    row.style.setProperty("--delay", i / 25 + "s");
  });

  document.querySelectorAll("tbody tr:not(.hide)").forEach((visible_row, i) => {
    visible_row.style.backgroundColor =
      i % 2 == 0 ? "transparent" : "#0000000b";
  });
}

//Sorting - Ordering data of table

// table_headings.forEach((head, i) => {
//   let sort_asc = true;
//   head.onclick = () => {
//     table_headings.forEach((head) => head.classList.remove("active"));
//     head.classList.add("active");

//     document
//       .querySelectorAll("td")
//       .forEach((td) => td.classList.remove("active"));
//     table_rows.forEach((row) => {
//       row.querySelectorAll("td")[i].classList.add("active");
//     });

//     head.classList.toggle("asc", sort_asc);
//     sort_asc = head.classList.contains("asc") ? false : true;

//     sortTable(i, sort_asc);
//   };
// });

// function sortTable(column, sort_asc) {
//   [...table_rows]
//     .sort((a, b) => {
//       let first_row = a
//           .querySelectorAll("td")
//           [column].textContent.toLowerCase(),
//         second_row = b.querySelectorAll("td")[column].textContent.toLowerCase();

//       return sort_asc
//         ? first_row < second_row
//           ? 1
//           : -1
//         : first_row < second_row
//         ? -1
//         : 1;
//     })
//     .map((sorted_row) =>
//       document.querySelector("tbody").appendChild(sorted_row)
//     );
// }

//Converting HTML table to PDF

const pdf_btn = document.querySelector("#toPDF");
const customers_table = document.querySelector("#customers_table");

const toPDF = function (customers_table) {
  const html_code = `
    <!DOCTYPE html>
    <link rel="stylesheet" type="text/css" href="../css/styles.css">
    <link rel="stylesheet" type="text/css" href="../css/oders.css">
    <main class="table" id="customers_table">${customers_table.innerHTML}</main>`;

  const new_window = window.open();
  new_window.document.write(html_code);

  setTimeout(() => {
    new_window.print();
    new_window.close();
  }, 400);
};

pdf_btn.onclick = () => {
  toPDF(customers_table);
};

//Converting HTML table to EXCEL File

const excel_btn = document.querySelector("#toEXCEL");

const toExcel = function (table) {
  const t_heads = table.querySelectorAll("th"),
    tbody_rows = table.querySelectorAll("tbody tr");

  const headings =
    [...t_heads]
      .map((head) => {
        let actual_head = head.textContent.trim().split(" ");
        return actual_head
          .splice(0, actual_head.length - 1)
          .join(" ")
          .toLowerCase();
      })
      .join("\t") +
    "\t" +
    "image name";

  const table_data = [...tbody_rows]
    .map((row) => {
      const cells = row.querySelectorAll("td"),
        img = decodeURIComponent(row.querySelector("img").src),
        data_without_img = [...cells]
          .map((cell) => cell.textContent.trim())
          .join("\t");

      return data_without_img + "\t" + img;
    })
    .join("\n");

  return headings + "\n" + table_data;
};

excel_btn.onclick = () => {
  const excel = toExcel(customers_table);
  downloadFile(excel, "excel");
};

const downloadFile = function (data, fileType, fileName = "") {
  const a = document.createElement("a");
  a.download = fileName;
  const mime_types = {
    json: "application/json",
    csv: "text/csv",
    excel: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  };
  a.href = `
        data:${mime_types[fileType]};charset=utf-8,${encodeURIComponent(data)}
    `;
  document.body.appendChild(a);
  a.click();
  a.remove();
};
