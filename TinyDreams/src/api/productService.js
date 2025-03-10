import axios from "axios";

let baseUrl = "https://nodeproject-gd82.onrender.com/api/product";

export function getAllProducts(index) {
    return axios.get(`${baseUrl}?&page=${index}`);
}

export function getProduct(productId) {
    return axios.get(`${baseUrl}/${productId}`)
}

export function getTotalPages() {
    return axios.get(`${baseUrl}/pages`)
}


export function addProduct(product, token) {
    return axios.post(baseUrl, product, {
        headers: {
            'authorization': 
            `Bearer ${token}` 
        }
    });
}

export function deleteProduct(productId) {
    return axios.delete(`${baseUrl}/${productId}`)
}

export function updateProduct(product, token) {
    return axios.put(`${baseUrl}/${product._id}`, product, {
        headers: {
            'authorization': 
            `Bearer ${token}` 
        }
    });
}

export function getProductsByCategory(category) {
    return axios.post(`${baseUrl}/category`, { category })
}

export function searchProducts(query) {
    const encodedQuery = encodeURIComponent(query);
    console.log("Encoded query:", encodedQuery); // בדיקה


    return axios.get(`https://nodeproject-gd82.onrender.com/api/product/search?query=${encodedQuery}`);
}
