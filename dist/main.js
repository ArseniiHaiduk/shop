import Cart from "./cart/cart.js";
import ProductsList from "./products/products.list.js";
const cart = new Cart();
console.log(cart);
const productsList = new ProductsList(cart);
console.log(productsList);
productsList.init();
