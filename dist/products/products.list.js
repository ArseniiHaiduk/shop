var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchAllProducts } from "../api/api.js";
import { productsListHtml, productsListItemHtml } from "../ui/ui.js";
import { pagination } from "../utils/pagination.js";
class ProductsList {
    constructor(cart, container, search) {
        this.cart = cart;
        this.container = container;
        this.search = search;
        this.allProducts = [];
        this.products = [];
        this.pagination = pagination;
        this.container.innerHTML = productsListHtml();
        this.cardList = document.querySelector(".cards");
        this.loadMoreButton =
            document.querySelector("#loadMoreButton");
    }
    init() {
        this.loadMoreButton.addEventListener("click", this.loadMoreHandler.bind(this));
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
                this.allProducts = yield fetchAllProducts();
                this.products = this.getProductsToDisplay(this.search);
                this.display();
            }
            catch (error) {
                console.error("Error loading products:", error);
            }
        });
    }
    createProductElement(product) {
        const productElement = document.createElement("div");
        productElement.innerHTML = productsListItemHtml(product);
        const buyButton = productElement.querySelector(".buy-btn");
        buyButton.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.cart.add(product);
        });
        const element = productElement.children[0];
        element.onclick = (event) => {
            event.preventDefault();
            window.location.hash = `/product/${product.id}`;
        };
        return element;
    }
    loadMoreHandler() {
        this.pagination.next();
        this.display();
    }
    getProductsToDisplay(search) {
        return search
            ? this.allProducts.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()))
            : [...this.allProducts];
    }
}
export default ProductsList;
