import { fetchCategories, fetchProducts } from "./api.js"
import { loadCategoryView } from "./categoryView.js"
import { navigate } from "./router.js"
import inventoryInstance from "./inventory.js"
import { Product } from "./product.js"

// Kõikidele toodetele laokogus
async function initializeInventory() {
  const products = await fetchProducts()
  products.forEach((productData) => {
    const product = new Product(
      productData.id,
      productData.title,
      productData.price,
      productData.description,
      productData.image
    )

    // Laokogustele suvaline kogus
    const randomStock = Math.floor(Math.random() * (20 - 5) + 5)
    inventoryInstance.addProduct(product, randomStock)
  })
}

initializeInventory()

const initApp = async () => {
  console.log("here")
  const categories = await fetchCategories()
  console.log(categories)
  const categoryMenu = document.getElementById("category-menu")

  categories.forEach((category) => {
    const categoryElement = document.createElement("li")
    categoryElement.textContent = category
    categoryElement.onclick = () => navigate("category", category)
    categoryMenu.appendChild(categoryElement)
  })

  loadCategoryView(categories[0])

  // Ostukorvi sündmus
  const cartButton = document.getElementById("go-to-cart")
  cartButton.onclick = () => navigate("cart")
}

document.addEventListener("DOMContentLoaded", initApp)

