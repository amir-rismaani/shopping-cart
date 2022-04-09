import { products } from "../data/products.js";

export default class Products {
  constructor() {
    this.items = products;
  }

  getProduct() {
    return this.items;
  }

  find(shopProductID) {
    return this.items.find(
      (item) => item.ShopProductID === parseInt(shopProductID)
    );
  }
}
