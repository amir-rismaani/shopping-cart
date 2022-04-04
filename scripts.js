import UI from "./class/ui.js";
const ui = new UI();

const navCart = document.querySelector(".nav__cart");
const closeModalBtn = document.querySelector(".close-modal");
const confirmModalBtn = document.querySelector(".confirm-modal");
const backDrop = document.querySelector(".back-drop");

document.addEventListener("DOMContentLoaded", () => {
  ui.productsLayout();
  ui.addToCartActionButton();
  ui.cartLayout();
});
navCart.addEventListener("click", ui.showModal);
closeModalBtn.addEventListener("click", ui.hideModal);
backDrop.addEventListener("click", ui.hideModal);
confirmModalBtn.addEventListener("click", () => {
  ui.hideModal();
  alert("you clicked on confirm modal!");
});
