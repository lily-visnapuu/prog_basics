import { getCart, getTotal, updateCartView } from "./cart.js";
import { navigate } from "./router.js"; // Lisa router navigeerimiseks

export const loadCartView = () => {
  const cart = getCart();
  console.log("cart", cart);
  const mainContent = document.getElementById("product-list");
  mainContent.innerHTML = ""; // Tühjenda tooteala, kui kasutaja vaatab ostukorvi

  const cartSection = document.createElement("div");
  cartSection.id = "shopping-cart"
  cartSection.innerHTML = "<h2>Shopping cart</h2>";
  const cartItemsContainer = document.createElement("div");
  cartItemsContainer.id = "cart-items";
  cartSection.appendChild(cartItemsContainer);
  mainContent.appendChild(cartSection);

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Shopping cart is empty.</p>";
    return;
  }


  const total = getTotal();
  mainContent.innerHTML += `<p id="cart-total">Total: ${total} €</p>`;
 mainContent.innerHTML += `<button id="cart-buy" onclick="alert('Order has been placed!')">Buy</button>`;

  // Uuenda ostukorvi vaadet
  updateCartView();

  // Lisa "Back" nupp, mis viib tagasi kategooria vaatesse
  const backButton = document.createElement("button");
  backButton.id = "cart-back"
  backButton.textContent = "Back";
  backButton.onclick = () => navigate("category"); // Viib tagasi kategooria vaatesse
  mainContent.appendChild(backButton);
};
