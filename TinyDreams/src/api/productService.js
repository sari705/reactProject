import axios  from "axios";

let baseUrl = "https://nodeproject-gd82.onrender.com/api/product";

export function getAllProducts(index) {
    return axios.get(`${baseUrl}?limit=15&page=${index}`);
}

export function getProduct(productId) {
    return axios.get(`${baseUrl}/${productId}`)
}

export function getTotalPages() {
    return axios.get(`${baseUrl}/totalPages?limit=15`)
}

export function addProduct(product) {
    return axios.post(baseUrl, product)
}

export function deleteProduct(productId) { 
    return axios.delete(`${baseUrl}/${productId}`)
}

export function updateProduct(product) {
    return axios.put(`${baseUrl}/${product._id}`, product)
}
