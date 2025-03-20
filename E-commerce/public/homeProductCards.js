import { homeQuantityToggle } from "./homeQuantityToggle";

const productContainerMain = document.querySelector(".mainData .container");

export const showProductContainer = (products) => {
  if (!products) {
    return false;
  }
  products.forEach((productElem, index) => {
    const card = document.createElement("div");
    const cardId = "card" + (index + 1);
    card.id = cardId;
    card.classList.add("cards");

    card.innerHTML = `
            <div class="category" >
                <span>${productElem.category}</span>
            </div>
            <div class="productName">
                <h1>${productElem.name}</h1>
            </div>
            <div class="imageHolder">
                <img src="${productElem.img}" alt="image"/>
            </div>
            <div class="ratings flex">
                <p>*</p>
                <p>*</p>
                <p>*</p>
                <p>*</p>
                <p>*</p>
            </div>
            <div class="description">
                <p>${productElem.description}</p>
            </div>
            <div class="twoPrices flex">
                <p class ="price">₹${productElem.price}</p>
                <p class="secPrice">₹${productElem.price * 4}</p>
            </div>
            <div class="totalStock">
                <p>Stocks Available : ${productElem.stockAvailable}</p>
            </div>
            <div class="quantityProducts flex">
                <div class="quantity">
                    <p class="quantityText">Quantity</p>
                </div>
                <div class="incre-dcre-btns flex">
                    <button class="increment btn">+</button>
                    <p class="value">0</p>
                    <button class="decrement btn">-</button>
                </div>
            </div>
            <div class="addToCartContainer">
                <button class="addToCartBtn">Add To Cart</button>
            </div>
        `;

        card.querySelector(".increment").addEventListener("click", (e) => {
            homeQuantityToggle(cardId, productElem.stockAvailable, e);
        });
        
        card.querySelector(".decrement").addEventListener("click", (e) => {
            homeQuantityToggle(cardId, productElem.stockAvailable, e);
        });
        
        

    productContainerMain.append(card);
  });
};


