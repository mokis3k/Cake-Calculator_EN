const addProductForm = document.querySelector("#addProductForm");
const productsTable = document.querySelector("#productsTable");
const productExists = document.querySelector("#productExists");
const THEADList = ["Ingredient", "Units", "Price (UAH)", "Delete"];
let productsList = JSON.parse(localStorage.getItem("products"));
let productsNames = [];

const renderTable = () => {
  const thead = renderThead();
  const tbody = renderTbody();
  tbody.setAttribute("id", "productsTableTbody");
  productsTable.append(thead, tbody);
};

const renderThead = () => {
  const thead = document.createElement("thead");
  THEADList.map((elem) => {
    th = document.createElement("th");
    th.innerHTML = elem;
    thead.append(th);
  });
  return thead;
};

const renderTbody = () => {
  const tbody = document.createElement("tbody");
  productsList.map((product) => {
    let tr = createTr(product);
    tbody.append(tr);
  });
  return tbody;
};

const addProduct = (product) => {
  let tbody = document.querySelector("#productsTableTbody");
  let tr = createTr(product);
  tbody.append(tr);

  productsList.push(product);
  localStorage.setItem("products", JSON.stringify(productsList));
};

const createTr = (obj) => {
  productsNames.push(obj.name);
  let tr = document.createElement("tr");
  Object.keys(obj).map((key) => {
    let td = document.createElement("td");
    if (key === "name") td.setAttribute("id", obj[key]);
    td.innerHTML = obj[key];
    tr.append(td);
  });
  const tdDelete = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.addEventListener("click", (e) => deleteButtonHandler(e, obj));
  tdDelete.append(deleteButton);
  tr.append(tdDelete);

  return tr;
};

const deleteButtonHandler = (e, obj) => {
  parentTr = e.target.closest(`tr`);
  parentTr.remove();
  productsList = productsList.filter((product) => product !== obj);
  productsNames = productsNames.filter(product => product !== obj.name)
  localStorage.setItem("products", JSON.stringify(productsList));
};

addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  productExists.classList.remove("active")

  let newProduct = new FormData(e.target);
  newProduct = Object.fromEntries(newProduct.entries());
  newProduct.price = +(newProduct.price.replaceAll(',', '.'));

  if (
    productsNames.includes(newProduct.name) ||
    !newProduct.name ||
    !newProduct.type ||
    !newProduct.price
  ) {
    productExists.classList.add("active");
  } else {
    addProduct(newProduct);
  }

  e.target.reset();
});

if (!productsList) productsList = [];
renderTable();
