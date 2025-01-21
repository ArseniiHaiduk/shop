import { CartItem } from "../types/cart.types";
import { Product } from "../types/product.types";
import { cartItemHtml } from "../ui/ui.js";

class Cart {
  private items: CartItem[] = [];
  private cartBadge: HTMLElement | null;
  private cartContent: HTMLElement;
  private totalPrice: HTMLElement;

  constructor() {
    const itemsRaw = localStorage.getItem("cart");

    this.cartBadge = document.querySelector("#cartBadge");
    this.cartContent = document.querySelector("#cartContent")!;
    this.totalPrice = document.querySelector("#totalPrice")!;

    try {
      const items = JSON.parse(itemsRaw || "");

      if (items) {
        this.items = items;
      }
    } catch (error) {}
  }

  add(product: Product, quantity = 1) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      this.setQuantity(existingItem, existingItem.quantity + quantity, true);
    } else {
      const cartItem: CartItem = {
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

  setQuantity(cartItem: CartItem, quantity: number, updateInput = false) {
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

  private getItemsCount() {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
  }

  private updateCartBadge(): void {
    if (this.cartBadge) {
      const itemsCount = this.getItemsCount();
      this.cartBadge.classList.toggle("d-none", itemsCount === 0);
      this.cartBadge.textContent = itemsCount.toString();
    }
  }

  private updateItem(item: CartItem, updateInput = false): void {
    this.items = this.items.map((cartItem) => {
      if (cartItem.product.id === item.product.id) {
        return item;
      }

      return cartItem;
    });

    const existingItem = this.getCartItemElement(item.product.id);

    if (existingItem) {
      existingItem.querySelector(".card-price")!.innerHTML =
        item.price.toFixed(2);

      if (updateInput) {
        existingItem.querySelector<HTMLInputElement>(".quantity-input")!.value =
          item.quantity.toString();
      }
    }

    this.updateCartBadge();
    this.updateTotalPrice();
  }

  private createCartItemElement(cartItem: CartItem) {
    const cartItemElement = document.createElement("div");

    cartItemElement.innerHTML = cartItemHtml(cartItem);

    cartItemElement
      .querySelector("input.quantity-input")
      ?.addEventListener("input", (event) =>
        this.handleQuantityChange(event, cartItem)
      );
    cartItemElement
      .querySelector(".remove-from-cart")
      ?.addEventListener("click", () => this.handleRemoveFromCart(cartItem));

    cartItemElement
      .querySelector("input[type='checkbox']")
      ?.addEventListener("change", (event) =>
        this.handleToggleCartItem(event, cartItem)
      );

    return cartItemElement.firstElementChild!;
  }

  private handleQuantityChange(event: Event, cartItem: CartItem): void {
    const target = event.target as HTMLInputElement;
    let value = target.valueAsNumber;

    if (isNaN(value) || value < 1) {
      target.value = "1";
      value = 1;
    } else if (value > 99) {
      target.value = "99";
      value = 99;
    }

    this.setQuantity(cartItem, value);
  }

  private handleRemoveFromCart(cartItem: CartItem): void {
    this.items = this.items.filter(
      (item) => item.product.id !== cartItem.product.id
    );
    this.updateTotalPrice();
    this.updateCartBadge();

    this.getCartItemElement(cartItem.product.id)
      ?.closest(".cart-item-wrapper")
      ?.remove();
  }

  private handleToggleCartItem(event: Event, cartItem: CartItem): void {
    const target = event.target as HTMLInputElement;

    cartItem.checked = target.checked;

    this.updateTotalPrice();
    this.updateCartBadge();

    const cartItemElement = this.getCartItemElement(cartItem.product.id);

    if (cartItemElement) {
      cartItemElement.classList.toggle("removed-item", !cartItem.checked);
      cartItemElement.querySelector<HTMLInputElement>(
        ".quantity-input"
      )!.disabled = !cartItem.checked;
    }
  }

  private updateTotalPrice(): void {
    this.totalPrice.textContent = this.getPrice().toFixed(2);
  }

  private getCartItemElement(productId: number) {
    return this.cartContent.querySelector(`.cart-item[data-id="${productId}"]`);
  }
}

export default Cart;
