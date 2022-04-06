export default class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  static deleteCartItem(item) {
    const cart = this.getCart();
    console.log(cart);
  }

  static getCart() {
    return JSON.parse(localStorage.getItem("cart"));
  }
}
