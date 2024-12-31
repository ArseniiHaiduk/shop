import { fetchAllProducts, fetchProducts } from "./api/api.js";
import { pagination } from "./utils/pagination.js";
import {
  addToCart,
  removeFromCart,
  handleQuantityChange,
  toggleCartItem,
} from "./cart/cart.js";
import { generationCards } from "./ui/ui.js";
import { filterProducts } from "./ui/search.js";
import { Product } from "./types/prodact-type.js";

const cardList: HTMLElement | null = document.querySelector(".cards");
const loadMore: HTMLButtonElement | null = document.querySelector(".load-more");
const modalBody: HTMLElement | null = document.querySelector(".modal-body");
const searchInput: HTMLInputElement | null =
  document.querySelector("#searchInput");

let allProducts: Product[] = [];
let displayedProducts: Product[] = [];

async function loadInitialProducts() {
  try {
    allProducts = await fetchAllProducts(pagination.select);
    const newProducts = await fetchProducts(pagination.skip, pagination.limit);
    pagination.next();
    displayedProducts = newProducts;
    if (cardList) {
      generationCards(cardList, displayedProducts);
    }
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

loadMore?.addEventListener("click", async () => {
  if (loadMore && cardList) {
    loadMore.disabled = true;

    try {
      const newProducts = await fetchProducts(
        pagination.skip,
        pagination.limit
      );
      pagination.next();
      generationCards(cardList, newProducts);
      displayedProducts = [...displayedProducts, ...newProducts];
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      loadMore.disabled = false;
    }
  }
});

let debounceTimer: ReturnType<typeof setTimeout>;

searchInput?.addEventListener("input", () => {
  const query = searchInput.value.trim();

  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    if (cardList) {
      filterProducts(query, allProducts, cardList, displayedProducts);
    }
  }, 500);
});

cardList?.addEventListener("click", (event) => {
  if (modalBody) {
    addToCart(event, modalBody);
  }
});

modalBody?.addEventListener("click", (event) => {
  const target = event.target;

  if (target instanceof HTMLElement) {
    const button = target.closest(".remove-from-cart");

    if (button) {
      removeFromCart(event);
    }
  }
});

modalBody?.addEventListener("input", (event) => {
  const target = event.target;

  if (target instanceof HTMLInputElement) {
    if (target.type === "checkbox") {
      toggleCartItem(target);
    } else if (target.type === "number") {
      handleQuantityChange(event);
    }
  }
});

loadInitialProducts();
