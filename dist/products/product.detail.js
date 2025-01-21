var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchProductDetails } from "../api/api.js";
import { productDetailsHtml } from "../ui/ui.js";
export default class ProductDetails {
    constructor(id, cart, container) {
        this.cart = cart;
        this.container = container;
        this.productId = id;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadAndDisplay();
            const addToCartButton = this.container.querySelector(".add-to-cart-btn");
            if (addToCartButton && this.product) {
                addToCartButton.addEventListener("click", (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    if (this.product) {
                        this.cart.add(this.product);
                    }
                });
            }
        });
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            this.product = yield fetchProductDetails(this.productId);
        });
    }
    loadAndDisplay() {
        return __awaiter(this, void 0, void 0, function* () {
            this.container.innerHTML = "Please wait...";
            try {
                this.product = yield fetchProductDetails(this.productId);
                this.container.innerHTML = productDetailsHtml(this.product);
            }
            catch (error) {
                this.container.innerHTML =
                    "Cannot fetch product details: " + error.message;
            }
        });
    }
}
