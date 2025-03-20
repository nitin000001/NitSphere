export const homeQuantityToggle = (id, stock, e) => {
    const currentCardElement = document.querySelector(`#${id}`);
    let productQuantity = currentCardElement.querySelector(".value");

    let quantity = parseInt(productQuantity.getAttribute("data-quantity")) || 1;

    if (e.target.className === "increment") {
        if (quantity < stock) {
            quantity = quantity + 1;
        } else if (quantity === stock) {
            quantity = stock;
        }
    }

    if (e.target.className === "decrement") {
        if (quantity > 1) {
            quantity = quantity - 1;
        }
    }

    productQuantity.textContent = quantity; // Update displayed quantity
    productQuantity.setAttribute("data-quantity", quantity.toString()); // Update data attribute
    return quantity;
};
