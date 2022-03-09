const body = document.querySelector("body");
const productsContainer = document.querySelector(".products");
const modal = document.querySelector(".modal");
const backDrop = document.querySelector(".back-drop");

const navCart = document.querySelector(".nav__cart");
const closeModalBtn = document.querySelector(".close-modal");
const confirmModalBtn = document.querySelector(".confirm-modal");

document.addEventListener("DOMContentLoaded", addProducts);
navCart.addEventListener("click", showModal);
closeModalBtn.addEventListener("click", hideModal);
backDrop.addEventListener("click", hideModal);
confirmModalBtn.addEventListener("click", () => {
  hideModal();
  alert("you clicked on confirm modal!");
});

async function getProduct() {
  const res = await fetch("http://localhost:3000/products");
  const promise = await res.json();
  return promise;
}

async function addProducts() {
  const products = await getProduct();
  products.forEach((product) => {
    const article = document.createElement("article");
    article.classList.add("product");
    let productsHtml = `
      <div class="product__image">
        <img
        src="${product.AssociationShopProductImageFile_relativeUrl}"
        alt="${product.ShopProductName}"
        />
      </div>
      <div class="product__details">
          <h3 class="name">${product.ShopProductName}</h3>
    `;
    if (product.PercentDiscount) {
      productsHtml += `
        <div class="d-flex space-between">
          <span class="percent-discount">${product.PercentDiscount}%</span>
          <span class="discounted-price">${separator(
            product.SalePrice -
              product.SalePrice * (product.PercentDiscount / 100)
          )} </span>
        </div>
      `;
    }

    productsHtml += `
      <span class="d-block price ${
        product.PercentDiscount ? "line-through" : ""
      }">${separator(product.SalePrice)}</span>
    `;

    productsHtml += `
        <span class="product__add-to-cart">
          <i class="fa-solid fa-cart-plus"></i>
        </span>
      </div>
    `;

    article.innerHTML = productsHtml;

    productsContainer.appendChild(article);
  });
}

function separator(price) {
  return `${price.toLocaleString("en")} <span class="unit">تومان</span>`;
}

function showModal() {
  backDrop.style.display = "block";
  modal.style.transform = "translateY(0)";
  modal.style.opacity = "1";
  body.style.overflowY = "hidden";
}

function hideModal() {
  backDrop.style.display = "none";
  modal.style.transform = "translateY(-100vh)";
  modal.style.opacity = "0";
  body.style.overflowY = "auto";
}
