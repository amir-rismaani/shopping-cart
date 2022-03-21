import { products } from "../data/products.js";
import Storage from "./storage.js";

export default class Products {
  constructor() {
    this.items = products;
  }

  getProduct() {
    Storage.saveProducts(this.items);
    return this.items;
  }

  find(shopProductID) {
    return this.items.find(
      (item) => item.ShopProductID === parseInt(shopProductID)
    );
  }
}
