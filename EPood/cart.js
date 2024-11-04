import { Product } from "./product.js";
import inventoryInstance from "./inventory.js";
import { loadCartView } from "./cartView.js";

let cart = [];

export const getCart = () => {
  return cart;
};

export const addToCart = (product) => {
  if (inventoryInstance.isAvailable(product.id)) {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    inventoryInstance.reduceStock(product.id);
  } else {
    alert("Product is out of stock!");
  }
};

export const removeFromCart = (product) => {
  console.log("remove", product);

  cart = cart.filter((item) => item.id !== product.id);

  const productInstance = new Product(
    product.id,
    product.title,
    product.price,
    product.description,
    product.image
  );

  inventoryInstance.addProduct(productInstance, product.quantity); // Lisame `Product` eksemplari laoseisu
  loadCartView(); // uuenda vaadet
};

// Uuenda toote kogust
export const updateCartItemQuantity = (productId, newQuantity) => {
  const product = cart.find((item) => item.id === productId);
  if (product) {
    product.quantity = newQuantity > 0 ? newQuantity : 1; // Vähemalt 1 toode

    loadCartView(); // uuenda vaadet
  }
};

export const updateCartView = () => {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";
  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.id = "cart-items-info"

    cartItem.innerHTML = `
      <h3>${item.title}</h3>
      <p>Price: ${item.price} €</p>
      <p>Stock: ${inventoryInstance.getStock(item.id)} units</p>
    `;

    // Koguse sisestusväli ja nupud
    const quantityContainer = document.createElement("div");
    quantityContainer.className = "quantity-container";

    const decreaseButton = document.createElement("button");
    decreaseButton.textContent = "-";
    decreaseButton.onclick = () =>
      updateCartItemQuantity(item.id, item.quantity - 1);

    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.value = item.quantity;
    quantityInput.min = 1;
    quantityInput.onchange = (e) =>
      updateCartItemQuantity(item.id, parseInt(e.target.value));

    const increaseButton = document.createElement("button");
    increaseButton.textContent = "+";
    increaseButton.onclick = () =>
      updateCartItemQuantity(item.id, item.quantity + 1);

    quantityContainer.appendChild(decreaseButton);
    quantityContainer.appendChild(quantityInput);
    quantityContainer.appendChild(increaseButton);

    cartItem.appendChild(quantityContainer);

    // Eemaldamisnupp
    const removeButton = document.createElement("button");
    removeButton.id = "remove"
    removeButton.textContent = "Remove";
    removeButton.onclick = () => removeFromCart(item);

    cartItem.appendChild(removeButton);
    cartItemsContainer.appendChild(cartItem);
  });
};


export const getTotal = () => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};
