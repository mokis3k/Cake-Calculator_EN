const calculatorForm = document.querySelector("#calculatorForm");
const productType = document.querySelector("#productType");
const calculateButton = document.querySelector("#calculateButton");
let calculatorProducts = document.querySelector("#calculatorProducts");
const calculatorProductsWrapper = document.querySelector(
  "#calculatorProductsWrapper"
);
const productExists = document.querySelector("#productExists");
const productsSelect = document.querySelector("#productsSelect");
const clearButton = document.querySelector("#clearButton");
const total = document.querySelector("#total");
let calculateProductList = [];
let productsNames = [];
let productsList = JSON.parse(localStorage.getItem("products"));

calculatorForm.addEventListener("submit", (e) => {
  e.preventDefault();

  productExists.classList.remove("active");

  let product = new FormData(e.target);
  product = Object.fromEntries(product.entries());
  product.amount = +(product.amount.replaceAll(',', '.'));

  if (!calculatorProducts) createCalculatorProducts();

  if (
    productsNames.includes(product.name) ||
    !product.name ||
    !product.amount
  ) {
    productExists.classList.add("active");
  } else {
    renderProduct(product);
  }

  e.target.reset();
});

productsSelect.addEventListener("change", (e) => {
  addType(e);
});

const createCalculatorProducts = () => {
  calculatorProducts = document.createElement("div");
  calculatorProducts.setAttribute("id", "calculatorProducts");
  calculatorProducts.setAttribute("class", "calculator__products");
  calculatorProductsWrapper.append(calculatorProducts);
};

const renderProduct = (product) => {
  productsNames.push(product.name);
  calculateProductList.push(product);
  const productDiv = document.createElement("div");
  productDiv.classList.add("calculator__product");
  const productName = document.createElement("span");
  productName.innerHTML = product.name;
  const productAmount = document.createElement("span");
  productAmount.innerHTML = `${product.amount} ${productType.innerHTML}`;
  productDiv.append(productName, productAmount);
  calculatorProducts.append(productDiv);
};

const addType = (e) => {
  const productName = e.target.value;
  productsList.map((obj) => {
    if (obj.name === productName) {
      switch (obj.type) {
        case "piece":
          productType.innerHTML = "pieces";
          break;
        case "liter":
          productType.innerHTML = "l";
          break;
        case "gram":
          productType.innerHTML = "gr.";
          break;
        case "kilogram":
          productType.innerHTML = "kg";
          break;
        case "milliliter":
          productType.innerHTML = "ml";
          break;
      }
    }
  });
};

const getProductsNames = () => {
  productsList.map((obj) => {
    const option = document.createElement("option");
    option.innerHTML = obj.name;
    productsSelect.append(option);
  });
};

calculateButton.addEventListener("click", (e) => {
  let totalCost = 0;
  calculateProductList.map((obj) => {
    productsList.map((objInner) => {
      if (obj.name === objInner.name) {
        totalCost += +obj.amount * +objInner.price;
      }
    });
    total.innerHTML = `${totalCost} UAH`;
  });
});

clearButton.addEventListener("click", (e) => {
  calculatorProducts.innerHTML = "";
  productsNames = [];
  calculateProductList = [];
  total.innerHTML = "00.0 UAH";
});

if (!productsList) productsList = [];
getProductsNames();
