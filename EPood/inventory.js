import { Product } from "./product.js"

class Inventory {
  constructor() {
    this.stock = {}
  }

   //Uue lisamine lattu
  addProduct(product, quantity) {
    if (!(product instanceof Product)) {
      throw new Error("")
    }
    this.stock[product.id] = (this.stock[product.id] || 0) + quantity
  }

   //Koguse kontroll !
  isAvailable(productId, quantity = 1) {
    return (this.stock[productId] || 0) >= quantity
  }

  // Laoseisu vähendamine !
  reduceStock(productId, quantity = 1) {
    if (this.isAvailable(productId, quantity)) {
      this.stock[productId] -= quantity
    } else {
      throw new Error("Insufficient stock.")
    }
  }

  
  getStock(productId) {
    return this.stock[productId] || 0
  }
}

// instants
const inventoryInstance = new Inventory()
export default inventoryInstance
