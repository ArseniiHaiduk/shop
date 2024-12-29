var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchAllProducts, fetchProducts } from "./api.js";
import { pagination } from "./pagination.js";
import { addToCart, removeFromCart, handleQuantityChange, toggleCartItem, } from "./cart.js";
import { generationCards } from "./ui.js";
import { filterProducts } from "./search.js";
const cardList = document.querySelector(".cards");
const loadMore = document.querySelector(".load-more");
const modalBody = document.querySelector(".modal-body");
const searchInput = document.querySelector("#searchInput");
let allProducts = [];
let displayedProducts = [];
function loadInitialProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            allProducts = yield fetchAllProducts(pagination.select);
            const newProducts = yield fetchProducts(pagination.skip, pagination.limit);
            pagination.next();
            displayedProducts = newProducts;
            if (cardList) {
                generationCards(cardList, displayedProducts);
            }
        }
        catch (error) {
            console.error("Error loading products:", error);
        }
    });
}
loadMore === null || loadMore === void 0 ? void 0 : loadMore.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    if (loadMore && cardList) {
        loadMore.disabled = true;
        try {
            const newProducts = yield fetchProducts(pagination.skip, pagination.limit);
            pagination.next();
            generationCards(cardList, newProducts);
            displayedProducts = [...displayedProducts, ...newProducts];
        }
        catch (error) {
            console.error("Error loading more products:", error);
        }
        finally {
            loadMore.disabled = false;
        }
    }
}));
let debounceTimer;
searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        if (cardList) {
            filterProducts(query, allProducts, cardList, displayedProducts);
        }
    }, 500);
});
cardList === null || cardList === void 0 ? void 0 : cardList.addEventListener("click", (event) => {
    if (modalBody) {
        addToCart(event, modalBody);
    }
});
modalBody === null || modalBody === void 0 ? void 0 : modalBody.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement) {
        const button = target.closest(".remove-from-cart");
        if (button) {
            removeFromCart(event);
        }
    }
});
modalBody === null || modalBody === void 0 ? void 0 : modalBody.addEventListener("input", (event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
        if (target.type === "checkbox") {
            toggleCartItem(target);
        }
        else if (target.type === "number") {
            handleQuantityChange(event);
        }
    }
});
loadInitialProducts();
