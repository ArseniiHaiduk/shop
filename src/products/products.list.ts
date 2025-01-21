import { fetchAllProducts } from "../api/api.js";
import Cart from "../cart/cart.js";
import { Pagination } from "../types/pagination.types";
import { Product } from "../types/product.types";
import { productItemHtml } from "../ui/ui.js";
import { pagination } from "../utils/pagination.js";
import ProductCardHandler from "./product.detail.js";

class ProductsList {
  public allProducts: Product[];
  private products: Product[];
  private pagination: Pagination;

  private cardList: HTMLElement;
  private loadMoreButton: HTMLButtonElement;
  private searchForm: HTMLFormElement;
  private searchInput: HTMLInputElement;
  private searchDebounceTimer: ReturnType<typeof setTimeout> | undefined;

  constructor(private cart: Cart | null = null) {
    this.allProducts = [];
    this.products = [];
    this.pagination = pagination;

    this.cardList = document.querySelector<HTMLElement>(".cards")!;
    this.loadMoreButton =
      document.querySelector<HTMLButtonElement>("#loadMoreButton")!;

    this.searchForm = document.querySelector<HTMLFormElement>("#searchForm")!;

    this.searchInput =
      document.querySelector<HTMLInputElement>("#searchInput")!;
  }

  init() {
    if (!this.cardList || !this.loadMoreButton || !this.searchForm) {
      console.warn(
        "ProductsList: init() is not executed because this is not the main page."
      );
      return;
    }
    this.loadMoreButton.addEventListener(
      "click",
      this.loadMoreHandler.bind(this)
    );

    this.searchForm.addEventListener(
      "submit",
      this.searchSubmitHandler.bind(this)
    );
    this.searchInput.addEventListener("input", this.searchHandler.bind(this));

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
    this.initProductCardHandler();
  }

  async load() {
    try {
      this.allProducts = await fetchAllProducts();
      this.products = [...this.allProducts];
      this.display();
    } catch (error) {
      console.error("Error loading products:", error);
    }
  }

  private createProductElement(product: Product) {
    const productElement = document.createElement("div");
    productElement.innerHTML = productItemHtml(product);

    const buyButton = productElement.querySelector(".buy-btn")!;
    buyButton.addEventListener("click", () => {
      this.cart?.add(product); // Optional chaining
    });

    return productElement.firstElementChild!;
  }

  private loadMoreHandler() {
    this.pagination.next();
    this.display();
  }

  private searchSubmitHandler(event: Event) {
    event.preventDefault();
    const query = (event.target as HTMLInputElement).value.trim();
    this.searchProducts(query);
  }

  private searchHandler(event: Event) {
    const query = (event.target as HTMLInputElement).value.trim();

    clearTimeout(this.searchDebounceTimer);

    this.searchDebounceTimer = setTimeout(() => {
      this.searchProducts(query);
    }, 500);
  }

  private searchProducts(query: string) {
    this.products = this.allProducts.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );

    this.display(true);
  }

  private initProductCardHandler() {
    const productCardHandler = new ProductCardHandler(".product-card");
    productCardHandler.init();
  }
}

export default ProductsList;
