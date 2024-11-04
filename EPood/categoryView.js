import { fetchProductsByCategory } from "./api.js";
import { fetchProducts } from "./api.js";
import { addToCart } from "./cart.js";
import { navigate } from "./router.js";
import { Product } from "./product.js";

export const loadCategoryView = async (category = "all") => {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // Tühjenda vaateala

  let products = [];
  if (category === "all") {
      products = await fetchProducts(); // Laadi kõik tooted
  } else {
      products = await fetchProductsByCategory(category); // Laadi ainult valitud kategooria tooted
  }

  products.forEach((productData) => {
    const product = new Product(
      productData.id,
      productData.title,
      productData.price,
      productData.description,
      productData.image
    );

    const productElement = document.createElement("div");
    productElement.classList.add("product-item");
    productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.price}€</p>
            <button id="add-to-cart-${product.id}">Add to cart</button>
        `;

    // Klikk tootekaardil viib toote detailvaatesse
    productElement.onclick = () => navigate("product", product.id);

    productList.appendChild(productElement);

    document.getElementById(`add-to-cart-${product.id}`).onclick = (e) => {
      e.stopPropagation(); // Vältida, et tootekaardile klikkimine navigeeriks tootevaatesse, kui vajutatakse "Lisa ostukorvi" nuppu
      addToCart(product);
      console.log("click");
    };
  });
};

