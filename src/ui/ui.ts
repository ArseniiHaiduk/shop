import { CartItem } from "../types/cart.types.js";
import { Product } from "../types/product.types.js";

export function productItemHtml(product: Product) {
  return `<div data-id="${product.id}" class="card" style="width: 18rem">
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
}

export function cartItemHtml({ product, price }: CartItem) {
  return `
    <div class="cart-item-wrapper">
      <div class="input-checkbox-container">
        <input type="checkbox" checked />
          <button class="remove-from-cart"><i class="fa-regular fa-trash-can"></i></button>
      </div>
      <div class="cart-item card mb-3" data-id="${
        product.id
      }" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${product.thumbnail}" 
                class="cart-item-img img-fluid rounded-start mx-auto d-block" 
                alt="${product.title}" 
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">${product.description}</p>
              <div class="card-price-input">
                <p class="card-price">
                  ${price.toFixed(2)}
                </p>
                <input type="number" value="1" max="99" min="1" class="quantity-input"/>
              </div>
          </div>
          </div>
        </div>
      </div>
    </div>`;
}
