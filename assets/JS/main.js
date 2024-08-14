// Search
// clean Data

let title = document.querySelector("#pro-Name");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector("#total-price");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let btnCreate = document.querySelector("#create");
let btnDeleteAll = document.querySelector("#deleteAll");
let inputSearch = document.querySelector("#search");
let searchbtns = document.querySelector(".searchbtns");
let worngTitle = document.querySelector("#warning-title");
let worngPrice = document.querySelector("#warning-price");
let pageMode = document.querySelector("#page-mode");
// GetTotal()
function GetTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.classList.replace("btn-danger", "btn-success");
  } else {
    total.innerHTML = "total:";
    total.classList.replace("btn-success", "btn-danger");
  }
}

let arrProducts;
if (localStorage.product) {
  arrProducts = JSON.parse(localStorage.product);
  showData();
} else {
  arrProducts = [];
}

// create product and save it in localStorage
// clear input after create
btnCreate.onclick = function () {
  // create product
  let p = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  // validation
  if (p.title.trim() === "") {
    worngTitle.textContent = "Can not create product without title";
    title.focus();
    return;
  } else{
    worngTitle.textContent = "";
  }
  if (p.price === "") {
    worngPrice.textContent = "Can not create product without price";
    price.focus();
    return;
  } else{
    worngPrice.textContent = "";
  }

  // store in arr
  if (p.count > 1) {
    for (let i = 0; i < p.count; i++) {
      arrProducts.push(p);
    }
  } else {
    arrProducts.push(p);
  }
  // store in localStorage
  localStorage.setItem("product", JSON.stringify(arrProducts));

  clearInput();
  showData();
};

function clearInput() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "total:";
  count.value = "";
  category.value = "";
  
  total.classList.replace("btn-success", "btn-danger");
}

// Read
function showData() {
  let tbody = "";
  for (let i = 0; i < arrProducts.length; i++) {
    tbody += `<tr>
    <td>${i}</td>
    <td>${arrProducts[i].title}</td>
    <td>${arrProducts[i].price}</td>
    <td>${arrProducts[i].taxes}</td>
    <td>${arrProducts[i].ads}</td>
    <td>${arrProducts[i].discount}</td>
    <td>${arrProducts[i].total}</td>
    <td>${arrProducts[i].category}</td>
    <td><button type="button" class="btn btn-primary" onclick = "update(${i})">Update</button></td>
    <td><button type="button" class="btn btn-danger" onclick = "delet(${i})">Delete</button></td>
    </tr>`;
  }
  document.querySelector("tbody").innerHTML = tbody;

  if (arrProducts.length > 0) {
    btnDeleteAll.textContent = `Delete All (${arrProducts.length})`;
    btnDeleteAll.classList.remove("d-none")
  }else{
    btnDeleteAll.classList.add("d-none")
  }
}

// Delete
function delet(id) {
  arrProducts.splice(id, 1);
  localStorage.product = JSON.stringify(arrProducts);
  showData();
}
// Delete All
function deletAll(id) {
  arrProducts.splice(0);
  localStorage.clear();
  showData();
}

// Update
function update(id) {
  title.focus();
  count.style.display = "none";
  btnCreate.textContent = "Update";
  btnCreate.onclick = function(){
    // create product
      let p = {
      title: title.value,
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value,
    };
    // validation
    if (p.title.trim() === "") {
      worngTitle.textContent = "Can not create product without title";
      title.focus();
      return;
    } else{
      worngTitle.textContent = "";
    }
    if (p.price === "") {
      worngPrice.textContent = "Can not create product without price";
      price.focus();
      return;
    } else{
      worngPrice.textContent = "";
    }

    // store product
    arrProducts.splice(id, 1, p);
    localStorage.product = JSON.stringify(arrProducts);
    
    clearInput();
    showData();
    count.style.display = "block";
    btnCreate.textContent = "Create";
  }  
}

// search
searchMod = "title";
searchbtns.addEventListener("click", function (btn) {
  if (btn.target.id == "sbt") {
    searchMod = "title";
  } else {
    searchMod = "category";
  }

  inputSearch.placeholder = `Search by ${searchMod}`;
  inputSearch.focus();
  inputSearch.value = "";
  showData();
});

function searchData(value) {
  let tbody = "";
  if (searchMod == "title") {
    for (let i = 0; i < arrProducts.length; i++) {
      if (arrProducts[i].title.includes(value)) {
        tbody += `<tr>
          <td>${i}</td>
          <td>${arrProducts[i].title}</td>
          <td>${arrProducts[i].price}</td>
          <td>${arrProducts[i].taxes}</td>
          <td>${arrProducts[i].ads}</td>
          <td>${arrProducts[i].discount}</td>
          <td>${arrProducts[i].total}</td>
          <td>${arrProducts[i].category}</td>
          <td><button type="button" class="btn btn-primary" onclick = "update(${i})">Update</button></td>
          <td><button type="button" class="btn btn-danger" onclick = "delet(${i})">Delete</button></td>
          </tr>`;
      }
    }
  } else {
    for (let i = 0; i < arrProducts.length; i++) {
      if (arrProducts[i].category.includes(value)) {
        tbody += `<tr>
          <td>${i}</td>
          <td>${arrProducts[i].title}</td>
          <td>${arrProducts[i].price}</td>
          <td>${arrProducts[i].taxes}</td>
          <td>${arrProducts[i].ads}</td>
          <td>${arrProducts[i].discount}</td>
          <td>${arrProducts[i].total}</td>
          <td>${arrProducts[i].category}</td>
          <td><button type="button" class="btn btn-primary" onclick = "update(${i})">Update</button></td>
          <td><button type="button" class="btn btn-danger" onclick = "delet(${i})">Delete</button></td>
          </tr>`;
      }
    }
  }
  document.querySelector("tbody").innerHTML = tbody;
}

// change mode
console.log(pageMode);

pageMode.onclick = function () {
  pageMode.classList.toggle("fa-toggle-on");
  pageMode.classList.toggle("fa-toggle-off");
  if (pageMode.classList.contains("fa-toggle-off")) {
    document.body.style.backgroundColor = "#F5EDED";
    for (let i = 0; i < 8; i++) {
      document.querySelectorAll("input")[i].style.cssText = `
        background-color: #E2DAD6;
        color: #53719C;
      ` ;
    }
    document.querySelector(".header").style.color = "#6482AD";
    document.querySelector("table").className = "table table-light";
  } else{
    document.body.style.backgroundColor = "#333";
    for (let i = 0; i < 8; i++) {
      document.querySelectorAll("input")[i].style.cssText = `
        background-color: #222;
        color: #03AED2;
      ` ;
    }
    document.querySelector(".header").style.color = "#03AED2";
    document.querySelector("table").className = "table table-dark";
  }
}
pageMode.onmousemove = function () {
  if (pageMode.classList.contains("fa-toggle-off")){
    pageMode.setAttribute("title", "Dark Mode");
  }else {
    pageMode.setAttribute("title", "Light Mode");
  }
}