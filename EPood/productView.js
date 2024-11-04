import { fetchProductById } from "./api.js";
import { addToCart } from "./cart.js";
import { navigate } from './router.js';

import inventoryInstance from "./inventory.js";
import { Product } from "./product.js";

export const loadProductView = async (productId) => {
  const productData = await fetchProductById(productId);

  const product = new Product(
    productData.id,
    productData.title,
    productData.price,
    productData.description,
    productData.image
  );
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; 

  const productDetailElement = document.createElement("div");
  productDetailElement.classList.add("product-detail");
  productDetailElement.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p class="price">Price: ${product.price}€</p>
         <p class="stock">Stock: ${inventoryInstance.getStock(product.id)} units</p>
        <button id="add-to-cart-${product.id}">Add to cart</button>
        <button id="back-to-category">Back to products</button>
    `;
  -productList.appendChild(productDetailElement);

  // Lisa ostukorvile sündmus
  document.getElementById(`add-to-cart-${product.id}`).onclick = () => {
    addToCart(product);
    loadProductView(product.id);
  };

  // Nupp kõikide toodete vaatesse
  document.getElementById("back-to-category").onclick = () =>
    navigate("category");
};
