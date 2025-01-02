import { Cart } from "./cart/index.js";
import { ProductsList } from "./products/index.js";

const cart = new Cart();

const productsList = new ProductsList(cart);

productsList.init();
