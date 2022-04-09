export default class Storage {
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  static getCart() {
    return JSON.parse(localStorage.getItem("cart"));
  }
}
