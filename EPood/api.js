const API_URL = "https://fakestoreapi.com";

export const fetchProducts = async (param) => {
  try {
    const response = await fetch(`${API_URL}/products`);
    return response.json();
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const fetchProductsByCategory = async (param) => {
  try {
    const response = await fetch(`${API_URL}/products/category/${param}`);
    return response.json();
  } catch (error) {
    console.error("Error: ", error);
  }
};


export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    return response.json();
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/products/categories`);
    return response.json();
  } catch (error) {
    console.error("Error: ", error);
  }
};
