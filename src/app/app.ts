import Cart from "../cart/cart.js";
import ProductDetails from "../products/product.detail.js";
import ProductsList from "../products/products.list.js";

export default class App {
  private pageContent: HTMLElement;
  private url: string;
  private cart: Cart;

  private searchForm: HTMLFormElement;

  constructor() {
    this.pageContent = document.querySelector("main")!;
    this.url = "/";

    this.cart = new Cart();

    this.searchForm = document.querySelector<HTMLFormElement>("#searchForm")!;
  }

  init() {
    this.setUrl();
    this.showPage();

    window.addEventListener("hashchange", this.handlePageChange.bind(this));

    this.searchForm.addEventListener(
      "submit",
      this.searchFormSubmitHandler.bind(this)
    );
  }

  private setUrl() {
    this.url = window.location.hash.replace(/^#/, "") || "/";
  }

  private handlePageChange() {
    this.setUrl();
    this.showPage();
  }

  private searchFormSubmitHandler(event: SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const search = formData.get("search")?.toString().trim() || "";

    window.location.hash = "/search/" + encodeURIComponent(search);
  }

  private showPage() {
    if (this.url === "/" || this.isSearchPage()) {
      return this.showProductsListPage();
    }

    if (/^\/product\/\d+/.test(this.url)) {
      return this.showProductDetailsPage();
    }

    this.showNotFoundPage();
  }

  private isSearchPage(): boolean {
    return /^\/search\/.*/.test(this.url);
  }

  private showProductsListPage() {
    const search = this.isSearchPage()
      ? decodeURIComponent(this.url.replace(/(\/search\/)(.*)/, "$2"))
      : undefined;

    console.log({ search });
    const productsList = new ProductsList(this.cart, this.pageContent, search);

    productsList.init();
  }

  private showProductDetailsPage() {
    const productId = Number(this.url.replace(/(.*\/product\/)(\d+)/, "$2"));

    if (isNaN(productId)) {
      return this.showNotFoundPage();
    }

    const productDetails = new ProductDetails(
      productId,
      this.cart,
      this.pageContent
    );
    productDetails.init();
  }

  private showNotFoundPage() {
    this.pageContent.innerHTML = "PAGE NOT FOUND";
  }
}
