import Cart from "../cart/cart.js";
import ProductDetails from "../products/product.detail.js";
import ProductsList from "../products/products.list.js";
export default class App {
    constructor() {
        this.pageContent = document.querySelector("main");
        this.url = "/";
        this.cart = new Cart();
        this.searchForm = document.querySelector("#searchForm");
    }
    init() {
        this.setUrl();
        this.showPage();
        window.addEventListener("hashchange", this.handlePageChange.bind(this));
        this.searchForm.addEventListener("submit", this.searchFormSubmitHandler.bind(this));
    }
    setUrl() {
        this.url = window.location.hash.replace(/^#/, "") || "/";
    }
    handlePageChange() {
        this.setUrl();
        this.showPage();
    }
    searchFormSubmitHandler(event) {
        var _a;
        event.preventDefault();
        const formData = new FormData(event.target);
        const search = ((_a = formData.get("search")) === null || _a === void 0 ? void 0 : _a.toString().trim()) || "";
        window.location.hash = "/search/" + encodeURIComponent(search);
    }
    showPage() {
        if (this.url === "/" || this.isSearchPage()) {
            return this.showProductsListPage();
        }
        if (/^\/product\/\d+/.test(this.url)) {
            return this.showProductDetailsPage();
        }
        this.showNotFoundPage();
    }
    isSearchPage() {
        return /^\/search\/.*/.test(this.url);
    }
    showProductsListPage() {
        const search = this.isSearchPage()
            ? decodeURIComponent(this.url.replace(/(\/search\/)(.*)/, "$2"))
            : undefined;
        console.log({ search });
        const productsList = new ProductsList(this.cart, this.pageContent, search);
        productsList.init();
    }
    showProductDetailsPage() {
        const productId = Number(this.url.replace(/(.*\/product\/)(\d+)/, "$2"));
        if (isNaN(productId)) {
            return this.showNotFoundPage();
        }
        const productDetails = new ProductDetails(productId, this.cart, this.pageContent);
        productDetails.init();
    }
    showNotFoundPage() {
        this.pageContent.innerHTML = "PAGE NOT FOUND";
    }
}
