import { fetchAllProducts } from "../api/index.js";
import { Cart } from "../cart/index.js";
import { Pagination, Product } from "../types";
import { productItemHtml } from "../ui/index.js";
import { pagination } from "../utils/index.js";

class ProductsList {
  private allProducts: Product[];
  private products: Product[];
  private pagination: Pagination;

  private cardList: HTMLElement;
  private loadMoreButton: HTMLButtonElement;
  private searchForm: HTMLFormElement;
  private searchInput: HTMLInputElement;
  private searchDebounceTimer: ReturnType<typeof setTimeout> | undefined;

  constructor(private cart: Cart) {
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
  }

  async load() {
    try {
      this.allProducts = await fetchAllProducts(pagination.select);
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
      this.cart.add(product);
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
}

export default ProductsList;
