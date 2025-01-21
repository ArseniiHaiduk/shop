import { productDetailsHtml } from "../ui/ui.js";
import ProductsList from "./products.list.js";
export default class ProductCardHandler {
    constructor(selector) {
        this.cards = document.querySelectorAll(selector);
    }
    init() {
        console.log("ProductCardHandler initialized.");
        this.cards.forEach((card) => {
            console.log(card);
            card.addEventListener("click", (event) => {
                console.log("Card clicked.");
                const target = event.target;
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
                }
                else {
                    console.error("Product ID is not defined.");
                }
            });
        });
    }
    renderProductDetails(product) {
        const productDetailsContainer = document.querySelector(".product-details");
        productDetailsContainer.innerHTML = "";
        productDetailsContainer.innerHTML = productDetailsHtml(product);
    }
}
