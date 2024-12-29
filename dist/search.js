import { generationCards } from "./ui.js";
function filterProducts(query, allProducts, cardList, displayedProducts) {
    let result = [];
    if (query === "") {
        cardList.innerHTML = "";
        generationCards(cardList, displayedProducts);
        result = displayedProducts;
    }
    else {
        const filteredProducts = allProducts.filter((product) => product.title.toLowerCase().includes(query.toLowerCase()));
        cardList.innerHTML = "";
        generationCards(cardList, filteredProducts);
        result = filteredProducts;
    }
    return result;
}
export { filterProducts };
