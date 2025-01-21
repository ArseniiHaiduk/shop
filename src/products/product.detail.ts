import { Product } from "../types/product.types";
import { productDetailsHtml } from "../ui/ui.js";
import ProductsList from "./products.list.js";

export default class ProductCardHandler {
  private cards: NodeListOf<HTMLElement>;

  constructor(selector: string) {
    this.cards = document.querySelectorAll<HTMLDivElement>(selector);
  }

  public init(): void {
    console.log("ProductCardHandler initialized.");

    this.cards.forEach((card) => {
      console.log(card);

      card.addEventListener("click", (event: MouseEvent) => {
        console.log("Card clicked.");

        const target = event.target as HTMLElement;

        if (target.classList.contains("buy-btn")) {
          return;
        }

        const productId = card.dataset.id;

        if (productId) {
          window.location.href = `/product.html?id=${productId}`;
          const productsList = new ProductsList();
          productsList.allProducts.forEach((product) => {
            if (product.id === Number(productId)) {
              console.log(product);
              this.renderProductDetails(product);
            }
          });
        } else {
          console.error("Product ID is not defined.");
        }
      });
    });
  }

  private renderProductDetails(product: Product): void {
    const productDetailsContainer = document.querySelector(".product-details")!;
    productDetailsContainer.innerHTML = "";
    productDetailsContainer.innerHTML = productDetailsHtml(product);
  }
}
