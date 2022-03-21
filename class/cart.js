import UI from "./ui.js";
import Storage from "./storage.js";

export default class Cart {
  constructor() {
    this.items = [];
    this.quantity = 0;
  }

  addToCart(item) {
    const ui = new UI();
    this.items.push(item);
    this.quantity = this.items.length;
    Storage.saveCart(this.items);
    ui.cartLayout();
  }

  find(shopProductID) {
    return this.items.find(
      (cartItem) => cartItem.product.ShopProductID === shopProductID
    );
  }
}
