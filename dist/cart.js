function addToCart(event, modalBody) {
    var _a, _b, _c;
    const target = event.target;
    if (target && target.classList.contains("buy-btn")) {
        const cardElement = target.closest(".card");
        if (cardElement) {
            const product = {
                id: cardElement.dataset.id || "",
                title: ((_a = cardElement.querySelector(".card-title")) === null || _a === void 0 ? void 0 : _a.textContent) || "",
                description: ((_b = cardElement.querySelector(".card-text")) === null || _b === void 0 ? void 0 : _b.textContent) || "",
                price: parseFloat(cardElement
                    .querySelector(".card-price-buy p")
                    .textContent.replace(/[^\d.-]/g, "")),
                thumbnail: ((_c = cardElement.querySelector(".card-img-top")) === null || _c === void 0 ? void 0 : _c.src) || "",
            };
            const existingItem = modalBody.querySelector(`.cart-item[data-id="${product.id}"]`);
            if (existingItem) {
                const quantityInput = existingItem.querySelector(".quantity-input");
                const currentQuantity = parseInt(quantityInput.value, 10);
                if (currentQuantity >= 99) {
                    alert("No more items can be added.");
                }
                else {
                    quantityInput.value = (currentQuantity + 1).toString();
                    const cardPrice = existingItem.querySelector(".card-price");
                    if (cardPrice) {
                        cardPrice.textContent = `$${(product.price *
                            (currentQuantity + 1)).toFixed(2)}`;
                    }
                }
            }
            else {
                const cartItemWrapper = document.createElement("div");
                cartItemWrapper.classList.add("cart-item-wrapper");
                cartItemWrapper.innerHTML = `
          <div class="input-checkbox-container">
            <input type="checkbox" checked />
            <button class="remove-from-cart"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        `;
                const cartItem = document.createElement("div");
                cartItem.classList.add("cart-item", "card", "mb-3");
                cartItem.style.maxWidth = "540px";
                cartItem.dataset.id = product.id;
                cartItem.innerHTML = `
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
                     <p class="card-price" 
                       data-unit-price="${product.price}">
                       $${product.price.toFixed(2)}
                     </p>
                     <input type="number" value="1" max="99" min="1" class="quantity-input"/>
                   </div>
                </div>
               </div>
             </div>
           `;
                cartItemWrapper.appendChild(cartItem);
                modalBody.appendChild(cartItemWrapper);
            }
            updateTotalPrice();
        }
    }
}
function removeFromCart(event) {
    const target = event.target;
    const button = target.closest(".remove-from-cart");
    if (button) {
        const cartItem = button.closest(".cart-item-wrapper");
        if (cartItem) {
            cartItem.remove();
            updateTotalPrice();
        }
    }
}
function handleQuantityChange(event) {
    const target = event.target;
    if (target.classList.contains("quantity-input")) {
        let value = parseInt(target.value, 10);
        if (isNaN(value) || value < 1) {
            target.value = "1";
        }
        else if (value > 99) {
            target.value = "99";
        }
        const cartItem = target.closest(".cart-item");
        if (cartItem) {
            const priceElement = cartItem.querySelector(".card-price");
            if (priceElement) {
                const pricePerUnit = parseFloat(priceElement.dataset.unitPrice || "0");
                const quantity = parseInt(target.value, 10) || 0;
                priceElement.textContent = `$${(pricePerUnit * quantity).toFixed(2)}`;
                updateTotalPrice();
            }
        }
    }
}
function toggleCartItem(toggleInput) {
    var _a;
    const parentElement = toggleInput.closest(".input-checkbox-container");
    const siblingElement = parentElement === null || parentElement === void 0 ? void 0 : parentElement.nextElementSibling;
    const priceElement = siblingElement === null || siblingElement === void 0 ? void 0 : siblingElement.querySelector(".card-price");
    const unitPrice = priceElement
        ? parseFloat(priceElement.dataset.unitPrice || "0")
        : 0;
    const quantityInput = siblingElement === null || siblingElement === void 0 ? void 0 : siblingElement.querySelector(".quantity-input");
    const totalPriceElement = document.querySelector(".total-price");
    let totalPriceNum = totalPriceElement
        ? parseFloat(((_a = totalPriceElement.textContent) === null || _a === void 0 ? void 0 : _a.replace(/[^\d.-]/g, "")) || "0")
        : 0;
    if (toggleInput.checked) {
        if (quantityInput)
            quantityInput.disabled = false;
        if (siblingElement) {
            siblingElement.classList.add("cart-item");
            siblingElement.classList.remove("removed-item");
            siblingElement.classList.add("added-item");
        }
        if (quantityInput) {
            totalPriceNum += unitPrice * parseInt(quantityInput.value, 10);
        }
    }
    else {
        if (quantityInput)
            quantityInput.disabled = true;
        if (siblingElement) {
            siblingElement.classList.remove("cart-item");
            siblingElement.classList.add("removed-item");
            siblingElement.classList.remove("added-item");
        }
        if (quantityInput) {
            totalPriceNum -= unitPrice * parseInt(quantityInput.value, 10);
        }
    }
    if (totalPriceElement) {
        totalPriceElement.textContent = `Total: $${totalPriceNum.toFixed(2)}`;
    }
}
function updateTotalPrice() {
    const cartItems = document.querySelectorAll(".cart-item");
    let totalPrice = 0;
    cartItems.forEach((item) => {
        const quantityInput = item.querySelector(".quantity-input");
        const quantity = parseInt(quantityInput.value, 10);
        const cardPrice = item.querySelector(".card-price");
        const unitPrice = parseFloat(cardPrice.dataset.unitPrice || "0");
        totalPrice += quantity * unitPrice;
    });
    const totalPriceElement = document.querySelector(".total-price");
    if (totalPriceElement) {
        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }
}
export { addToCart, removeFromCart, handleQuantityChange, toggleCartItem };
