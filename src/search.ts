import { generationCards } from "./ui.js";
import { Product } from "./types/prodact-type";

function filterProducts(
  query: string,
  allProducts: Product[],
  cardList: HTMLElement,
  displayedProducts: Product[]
) {
  let result: Product[] = [];

  if (query === "") {
    cardList.innerHTML = "";
    generationCards(cardList, displayedProducts);
    result = displayedProducts;
  } else {
    const filteredProducts = allProducts.filter((product: Product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    cardList.innerHTML = "";
    generationCards(cardList, filteredProducts);
    result = filteredProducts;
  }
  return result;
}

export { filterProducts };
