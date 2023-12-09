const burgerCheck = document.querySelector(".burger__check");
const burgerMenu = document.querySelector("#burgerMenu");

burgerCheck
  ? burgerCheck.addEventListener("change", (e) => {
      console.log(e.target);
      burgerMenu.classList.toggle("active");
    })
  : null;
