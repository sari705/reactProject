import axios  from "axios";

let baseUrl = "https://nodeproject-gd82.onrender.com/api/order";

export function getAllOrders(index) {
    return axios.get(`${baseUrl}?limit=15&page=${index}`);
}

export function getOrderByUser(userId) {
    return axios.get(`${baseUrl}/${userId}`)
}

export function getTotalPages() {
    return axios.get(`${baseUrl}/totalPages?limit=15`)
}

export function addOrder(order) {
    return axios.post(baseUrl, order)
}

export function deleteOrder(orderId) { 
    return axios.delete(`${baseUrl}/${orderId}`)
}

export function updateOrder(order) {
    return axios.put(`${baseUrl}/${order._id}`, order)
}
