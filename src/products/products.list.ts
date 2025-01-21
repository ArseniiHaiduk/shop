import { fetchAllProducts } from "../api/api.js";
import Cart from "../cart/cart.js";
import { Pagination } from "../types/pagination.types";
import { Product } from "../types/product.types";
import { productsListHtml, productsListItemHtml } from "../ui/ui.js";
import { pagination } from "../utils/pagination.js";

class ProductsList {
  public allProducts: Product[];
  private products: Product[];
  private pagination: Pagination;

  private cardList: HTMLElement;
  private loadMoreButton: HTMLButtonElement;

  constructor(
    private cart: Cart,
    private container: HTMLElement,
    private search?: string
  ) {
    this.allProducts = [];
    this.products = [];
    this.pagination = pagination;

    this.container.innerHTML = productsListHtml();

    this.cardList = document.querySelector<HTMLElement>(".cards")!;
    this.loadMoreButton =
      document.querySelector<HTMLButtonElement>("#loadMoreButton")!;
  }

  init() {
    this.loadMoreButton.addEventListener(
      "click",
      this.loadMoreHandler.bind(this)
    );

    this.load();
  }

  get() {
    const { limit, skip } = this.pagination;
    return this.products.slice(skip, skip + limit);
  }

  display(reset = false) {
    if (reset) {
      this.pagination.reset();
      this.cardList.innerHTML = "";
    }

    const products = this.get();

    products.forEach((product) => {
      this.cardList.appendChild(this.createProductElement(product));
    });

    this.loadMoreButton.classList.toggle(
      "d-none",
      this.products.length <= this.pagination.skip
    );
  }

  async load() {
    try {
      this.allProducts = await fetchAllProducts();
      this.products = this.getProductsToDisplay(this.search);
      this.display();
    } catch (error) {
      console.error("Error loading products:", error);
    }
  }

  private createProductElement(product: Product) {
    const productElement = document.createElement("div");
    productElement.innerHTML = productsListItemHtml(product);

    const buyButton = productElement.querySelector(".buy-btn")!;

    buyButton.addEventListener("click", (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      this.cart.add(product);
    });

    const element = productElement.children[0] as HTMLElement;

    element.onclick = (event: MouseEvent) => {
      event.preventDefault();
      window.location.hash = `/product/${product.id}`;
    };

    return element;
  }

  private loadMoreHandler() {
    this.pagination.next();
    this.display();
  }

  private getProductsToDisplay(search?: string) {
    return search
      ? this.allProducts.filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        )
      : [...this.allProducts];
  }
}

export default ProductsList;
