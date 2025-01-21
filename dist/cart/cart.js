import { cartItemHtml } from "../ui/ui.js";
class Cart {
    constructor() {
        this.items = [];
        const itemsRaw = localStorage.getItem("cart");
        this.cartBadge = document.querySelector("#cartBadge");
        this.cartContent = document.querySelector("#cartContent");
        this.totalPrice = document.querySelector("#totalPrice");
        try {
            const items = JSON.parse(itemsRaw || "");
            if (items) {
                this.items = items;
            }
        }
        catch (error) { }
    }
    add(product, quantity = 1) {
        const existingItem = this.items.find((item) => item.product.id === product.id);
        if (existingItem) {
            this.setQuantity(existingItem, existingItem.quantity + quantity, true);
        }
        else {
            const cartItem = {
                product,
                quantity,
                price: product.price * quantity,
                checked: true,
            };
            this.items.push(cartItem);
            this.cartContent.appendChild(this.createCartItemElement(cartItem));
            this.updateCartBadge();
            this.updateTotalPrice();
        }
    }
    setQuantity(cartItem, quantity, updateInput = false) {
        if (!cartItem.checked) {
            return;
        }
        cartItem.quantity = quantity;
        cartItem.price = cartItem.product.price * cartItem.quantity;
        this.updateItem(cartItem, updateInput);
    }
    getItems() {
        return this.items;
    }
    getPrice() {
        return this.items
            .filter((item) => item.checked)
            .reduce((acc, item) => acc + item.price, 0);
    }
    getItemsCount() {
        return this.items.reduce((acc, item) => acc + item.quantity, 0);
    }
    updateCartBadge() {
        if (this.cartBadge) {
            const itemsCount = this.getItemsCount();
            this.cartBadge.classList.toggle("d-none", itemsCount === 0);
            this.cartBadge.textContent = itemsCount.toString();
        }
    }
    updateItem(item, updateInput = false) {
        this.items = this.items.map((cartItem) => {
            if (cartItem.product.id === item.product.id) {
                return item;
            }
            return cartItem;
        });
        const existingItem = this.getCartItemElement(item.product.id);
        if (existingItem) {
            existingItem.querySelector(".card-price").innerHTML =
                item.price.toFixed(2);
            if (updateInput) {
                existingItem.querySelector(".quantity-input").value =
                    item.quantity.toString();
            }
        }
        this.updateCartBadge();
        this.updateTotalPrice();
    }
    createCartItemElement(cartItem) {
        var _a, _b, _c;
        const cartItemElement = document.createElement("div");
        cartItemElement.innerHTML = cartItemHtml(cartItem);
        (_a = cartItemElement
            .querySelector("input.quantity-input")) === null || _a === void 0 ? void 0 : _a.addEventListener("input", (event) => this.handleQuantityChange(event, cartItem));
        (_b = cartItemElement
            .querySelector(".remove-from-cart")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => this.handleRemoveFromCart(cartItem));
        (_c = cartItemElement
            .querySelector("input[type='checkbox']")) === null || _c === void 0 ? void 0 : _c.addEventListener("change", (event) => this.handleToggleCartItem(event, cartItem));
        return cartItemElement.firstElementChild;
    }
    handleQuantityChange(event, cartItem) {
        const target = event.target;
        let value = target.valueAsNumber;
        if (isNaN(value) || value < 1) {
            target.value = "1";
            value = 1;
        }
        else if (value > 99) {
            target.value = "99";
            value = 99;
        }
        this.setQuantity(cartItem, value);
    }
    handleRemoveFromCart(cartItem) {
        var _a, _b;
        this.items = this.items.filter((item) => item.product.id !== cartItem.product.id);
        this.updateTotalPrice();
        this.updateCartBadge();
        (_b = (_a = this.getCartItemElement(cartItem.product.id)) === null || _a === void 0 ? void 0 : _a.closest(".cart-item-wrapper")) === null || _b === void 0 ? void 0 : _b.remove();
    }
    handleToggleCartItem(event, cartItem) {
        const target = event.target;
        cartItem.checked = target.checked;
        this.updateTotalPrice();
        this.updateCartBadge();
        const cartItemElement = this.getCartItemElement(cartItem.product.id);
        if (cartItemElement) {
            cartItemElement.classList.toggle("removed-item", !cartItem.checked);
            cartItemElement.querySelector(".quantity-input").disabled = !cartItem.checked;
        }
    }
    updateTotalPrice() {
        this.totalPrice.textContent = this.getPrice().toFixed(2);
    }
    getCartItemElement(productId) {
        return this.cartContent.querySelector(`.cart-item[data-id="${productId}"]`);
    }
}
export default Cart;
