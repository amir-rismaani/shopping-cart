import Products from "./products.js";
import Cart from "./cart.js";

const products = new Products();
const cart = new Cart();

const body = document.querySelector("body");
const productsContainer = document.querySelector(".products");
const modal = document.querySelector(".modal");
const backDrop = document.querySelector(".back-drop");
const cartContainer = document.querySelector(".cart__container");

export default class UI {
  async productsLayout() {
    productsContainer.innerHTML = "";
    const productItems = products.getProduct();
    productItems.forEach((productItem) => {
      const article = document.createElement("article");
      article.classList.add("product");
      let productsHtml = `
        <div class="product__image">
          <img
          src="${productItem.AssociationShopProductImageFile_relativeUrl}"
          alt="${productItem.ShopProductName}"
          />
        </div>
        <div class="product__details">
            <h3 class="name">${productItem.ShopProductName}</h3>
      `;
      if (productItem.PercentDiscount) {
        productsHtml += `
          <div class="d-flex space-between">
            <span class="percent-discount">${
              productItem.PercentDiscount
            }%</span>
            <span class="discounted-price">${this.separator(
              productItem.SalePrice -
                productItem.SalePrice * (productItem.PercentDiscount / 100)
            )} </span>
          </div>
        `;
      }

      productsHtml += `
        <span class="d-block price ${
          productItem.PercentDiscount ? "line-through" : ""
        }">${this.separator(productItem.SalePrice)}</span>
        <span class="product__add-to-cart" data-product-id="${
          productItem.ShopProductID
        }">
            <i class="fa-solid fa-cart-plus"></i>
        </span>
        </div>
      `;
      article.innerHTML = productsHtml;

      productsContainer.appendChild(article);
    });
  }

  addToCartActionButton() {
    const addToCartButtons = document.querySelectorAll(".product__add-to-cart");
    const buttons = [...addToCartButtons];

    buttons.forEach((button) => {
      const id = button.dataset.productId;
      // this.changeCartButton(id);
      button.addEventListener("click", (event) => {
        const addToCartButton = event.target.parentElement;
        const productDetail = addToCartButton.parentElement;
        console.log("productDetail", productDetail);
        addToCartButton.remove();
        const cartLineQty = document.createElement("div");
        cartLineQty.classList.add("cart-line__quantity");

        cartLineQty.innerHTML = `
          <span class="quantity-btn increase fa-solid fa-plus"></span>
          <span class="quantity-value">1</span>
          <span class="quantity-btn decrease fa-solid fa-minus"></span>
        `;

        productDetail.appendChild(cartLineQty);

        const product = products.find(id);
        const cartItem = { product, quantity: 1 };
        cart.addToCart(cartItem);
      });
    });
  }

  changeCartButton(productId) {
    // const isInCart = cart.find(productId);
    // if (isInCart) {
    console.log("incar");
    const productDetails = document.querySelector(".product__details");
    const cartLineQty = document.createElement("div");
    cartLineQty.classList.add("cart-line__quantity");

    cartLineQty.innerHTML = `
      <span class="quantity-btn increase fa-solid fa-plus"></span>
      <span class="quantity-value">1</span>
      <span class="quantity-btn decrease fa-solid fa-minus"></span>
    `;

    productDetails.appendChild(cartLineQty);
    // }
  }
  cartLayout() {
    const cartItems = cart.items;
    const article = document.createElement("article");
    article.classList.add("cart-line");

    cartItems.forEach((cartItem) => {
      let cartLineHtml = `
          <div class="cart-line__image">
            <img
              src="${cartItem.product.AssociationShopProductImageFile_relativeUrl}"
              alt="${cartItem.product.ShopProductName}"
            />
          </div>
          <div class="cart-line__details">
            <h3 class="name">${cartItem.product.ShopProductName}</h3>
          `;

      if (cartItem.product.PercentDiscount) {
        cartLineHtml += `
              <span class="discounted-price"
                >${this.separator(
                  cartItem.product.SalePrice -
                    cartItem.product.SalePrice *
                      (cartItem.product.PercentDiscount / 100)
                )}
              </span>
            `;
      } else {
        cartLineHtml += `
            <span class="discounted-price"
              >${this.separator(cartItem.product.SalePrice)}
            </span>
          `;
      }

      cartLineHtml += `
      </div>
          <div class="cart-line__quantity">
            <span class="quantity-btn increase fa-solid fa-plus"></span>
            <span class="quantity-value">${cartItem.quantity}</span>
            <span class="quantity-btn decrease fa-solid fa-minus"></span>
          </div>
      `;
      article.innerHTML = cartLineHtml;
      cartContainer.appendChild(article);
    });

    const quantityLabel = document.querySelector(".quantity");
    quantityLabel.innerText = cart.quantity;
  }

  showModal() {
    backDrop.style.display = "block";
    modal.style.transform = "translateY(0)";
    modal.style.opacity = "1";
    body.style.overflowY = "hidden";
  }

  hideModal() {
    backDrop.style.display = "none";
    modal.style.transform = "translateY(-100vh)";
    modal.style.opacity = "0";
    body.style.overflowY = "auto";
  }

  separator(price) {
    return `${price.toLocaleString("en")} <span class="unit">تومان</span>`;
  }
}
