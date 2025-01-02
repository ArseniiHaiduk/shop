var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchAllProducts } from "../api/index.js";
import { productItemHtml } from "../ui/index.js";
import { pagination } from "../utils/index.js";
class ProductsList {
    constructor(cart) {
        this.cart = cart;
        this.allProducts = [];
        this.products = [];
        this.pagination = pagination;
        this.cardList = document.querySelector(".cards");
        this.loadMoreButton =
            document.querySelector("#loadMoreButton");
        this.searchForm = document.querySelector("#searchForm");
        this.searchInput =
            document.querySelector("#searchInput");
    }
    init() {
        this.loadMoreButton.addEventListener("click", this.loadMoreHandler.bind(this));
        this.searchForm.addEventListener("submit", this.searchSubmitHandler.bind(this));
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
        this.loadMoreButton.classList.toggle("d-none", this.products.length <= this.pagination.skip);
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.allProducts = yield fetchAllProducts(pagination.select);
                this.products = [...this.allProducts];
                this.display();
            }
            catch (error) {
                console.error("Error loading products:", error);
            }
        });
    }
    createProductElement(product) {
        const productElement = document.createElement("div");
        productElement.innerHTML = productItemHtml(product);
        const buyButton = productElement.querySelector(".buy-btn");
        buyButton.addEventListener("click", () => {
            this.cart.add(product);
        });
        return productElement.firstElementChild;
    }
    loadMoreHandler() {
        this.pagination.next();
        this.display();
    }
    searchSubmitHandler(event) {
        event.preventDefault();
        const query = event.target.value.trim();
        this.searchProducts(query);
    }
    searchHandler(event) {
        const query = event.target.value.trim();
        clearTimeout(this.searchDebounceTimer);
        this.searchDebounceTimer = setTimeout(() => {
            this.searchProducts(query);
        }, 500);
    }
    searchProducts(query) {
        this.products = this.allProducts.filter((product) => product.title.toLowerCase().includes(query.toLowerCase()));
        this.display(true);
    }
}
export default ProductsList;
