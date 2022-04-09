import Storage from "./storage.js";

export default class Cart {
  constructor() {
    this.items = Storage.getCart() || [];
  }

  addToCart(item) {
    this.items.push(item);
    Storage.saveCart(this.items);
  }

  updateCartLine(item) {
    const targetItem = this.find(item.product.ShopProductID);
    const index = this.items.indexOf(targetItem);
    if (item.quantity) this.items[index].quantity = item.quantity;
    else this.items.splice(index, 1);
    Storage.saveCart(this.items);
  }

  getTotal() {
    let total = 0;
    this.items.forEach((item) => {
      total += this.getCartLineTotal(item);
    });
    return total;
  }

  getQuantity() {
    return this.items.length;
  }

  getCartLineTotal(cartLine) {
    const cartLineProduct = cartLine.product;
    return (
      (cartLineProduct.PercentDiscount
        ? cartLineProduct.SalePrice -
          cartLineProduct.SalePrice * (cartLineProduct.PercentDiscount / 100)
        : cartLineProduct.SalePrice) * cartLine.quantity
    );
  }

  find(shopProductID) {
    return this.items.find(
      (item) => item.product.ShopProductID === parseInt(shopProductID)
    );
  }
}
