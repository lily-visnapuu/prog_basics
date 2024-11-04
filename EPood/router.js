import { loadCategoryView } from "./categoryView.js"
import { loadProductView } from "./productView.js"
import { loadCartView } from "./cartView.js"

export const navigate = (view, param) => {
  const views = {
    category: () => loadCategoryView(param || "all"), // kõik tooted
    product: () => loadProductView(param), // Ainult üks toode
    cart: () => loadCartView(), 
  }

  if (views[view]) {
    views[view]()

    
    const encodedParam = encodeURIComponent(param)
    const newUrl =
      view === "category" && !param ? "/" : `/${view}/${encodedParam || ""}`
    window.history.pushState({}, "", newUrl)
  }
}

// Sündmuse kuulamine nupuga back
window.addEventListener("popstate", () => {
  const path = window.location.pathname
  const [_, view, param] = path.split("/")
  const decodedParam = decodeURIComponent(param)
  navigate(view || "category", decodedParam)
})
