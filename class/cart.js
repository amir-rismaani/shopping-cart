import Storage from "./storage.js";

export default class Cart {
  constructor() {
    this.items = Storage.getCart() || [];
    this.quantity = 0;
    this.total = 0;
  }

  addToCart(item) {
    this.items.push(item);
    this.quantity = this.items.length;
    Storage.saveCart(this.items);
  }

  updateCartLine(item) {
    const targetItem = this.find(item.product.ShopProductID);
    const index = this.items.indexOf(targetItem);
    this.items[index].quantity = item.quantity;
    Storage.saveCart(this.items);
  }

  calculateTotal() {
    this.total = 0;
    this.items.forEach((item) => {
      this.total += this.getCartLineTotal(item);
    });
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
