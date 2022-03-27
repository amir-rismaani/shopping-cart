import Storage from "./storage.js";

export default class Cart {
  constructor() {
    this.items = Storage.getCart() || [];
    this.quantity = 0;
  }

  addToCart(item) {
    this.items.push(item);
    this.quantity = this.items.length;
    Storage.saveCart(this.items);
  }

  updateCartLine(item) {
    const targetItem = this.find(item.product.ShopProductID);
    const index = this.items.indexOf(targetItem);
    this.items.splice(index, 1);
    this.items = [...this.items, item];
    Storage.saveCart(this.items);
  }

  find(shopProductID) {
    return this.items.find(
      (cartItem) => cartItem.product.ShopProductID === parseInt(shopProductID)
    );
  }
}
