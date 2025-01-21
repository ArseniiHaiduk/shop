export function productItemHtml(product) {
    return `<div data-id="${product.id}" class="card product-card" style="width: 18rem">
            <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}" />
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">${product.description}</p>
            </div>
            <div class="card-price-buy">
              <button class="buy-btn btn btn-success">Add to cart</button>
              <p>$${product.price}</p>
            </div>
          </div>
          `;
}
export function cartItemHtml({ product, price }) {
    return `
    <div class="cart-item-wrapper">
      <div class="input-checkbox-container">
        <input type="checkbox" checked />
          <button class="remove-from-cart"><i class="fa-regular fa-trash-can"></i></button>
      </div>
      <div class="cart-item card mb-3" data-id="${product.id}" style="max-width: 540px;">
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
export function productDetailsHtml(product) {
    return `
      <div class="container my-5 p-4 bg-white rounded shadow-sm">
        <div class="row">
          <div class="col-md-6">
            <img src="${product.images[0]}" alt="${product.title}" class="img-fluid rounded" />
          </div>
          <div class="col-md-6">
            <h1 class="h3 mb-3">${product.title}</h1>
            <div class="text-danger h4 mb-3">${product.price}</div>
            <div class="d-flex gap-2 mb-3">
              <button class="btn btn-success">Buy Now</button>
              <button class="btn btn-primary">Add to Cart</button>
            </div>
            <div>
              <h3 class="h5">Additional Services:</h3>
              <ul class="list-unstyled">
                <li>Extended Warranty</li>
                <li>Accidental Damage Protection</li>
                <li>Full Coverage</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="mt-5">
          <h3 class="h5 mb-3">Similar Products:</h3>
          <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-2">
            <div class="col">
              <div class="card h-10">
                <img src="#" class="card-img-top" alt="Similar Product" />
                <div class="card-body text-center">
                  <h5 class="card-title h6">ASUS GeForce RTX 4060 Dual</h5>
                  <p class="text-danger">13,999 UAH</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card h-100">
                <img src="#" class="card-img-top" alt="Similar Product" />
                <div class="card-body text-center">
                  <h5 class="card-title h6">MSI GeForce RTX 4060 Ventus</h5>
                  <p class="text-danger">14,199 UAH</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card h-100">
                <img src="#" class="card-img-top" alt="Similar Product" />
                <div class="card-body text-center">
                  <h5 class="card-title h6">Gigabyte GeForce RTX 3060</h5>
                  <p class="text-danger">12,599 UAH</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card h-100">
                <img src="#" class="card-img-top" alt="Similar Product" />
                <div class="card-body text-center">
                  <h5 class="card-title h6">ASUS GeForce RTX 3050</h5>
                  <p class="text-danger">11,499 UAH</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
}
