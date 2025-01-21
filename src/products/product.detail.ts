import { fetchProductDetails } from "../api/api.js";
import Cart from "../cart/cart.js";
import { Product } from "../types/product.types.js";
import { productDetailsHtml } from "../ui/ui.js";

export default class ProductDetails {
  private productId: number;
  private product?: Product;

  constructor(id: number, private cart: Cart, private container: HTMLElement) {
    this.productId = id;
  }

  async init() {
    await this.loadAndDisplay();

    const addToCartButton = this.container.querySelector(".add-to-cart-btn")!;

    if (addToCartButton && this.product) {
      addToCartButton.addEventListener("click", (event: Event) => {
        event.preventDefault();
        event.stopPropagation();

        if (this.product) {
          this.cart.add(this.product);
        }
      });
    }
  }

  private async load() {
    this.product = await fetchProductDetails(this.productId);
  }

  private async loadAndDisplay() {
    this.container.innerHTML = "Please wait...";

    try {
      this.product = await fetchProductDetails(this.productId);

      this.container.innerHTML = productDetailsHtml(this.product);
    } catch (error) {
      this.container.innerHTML =
        "Cannot fetch product details: " + (error as Error).message;
    }
  }
}
