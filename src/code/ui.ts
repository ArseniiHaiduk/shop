import { Product } from "../types/prodact-type";

function generationCards(container: HTMLElement, products: Product[]) {
  products.forEach((product: Product) => {
    container.innerHTML += `<div data-id="${product.id}" class="card" style="width: 18rem">
                              <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}" />
                              <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text">${product.description}</p>
                                </div>
                                <div class="card-price-buy">
                                  <button href="#" class="buy-btn btn btn-success">Buy now</button>
                                  <p>$${product.price}</p>
                                </div>
                            </div>`;
  });
}

export { generationCards };
