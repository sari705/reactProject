import axios  from "axios";

let baseUrl = "https://nodeproject-gd82.onrender.com/api/order";

export function getAllOrders(token) {
    return axios.get(baseUrl, {
        headers: {
            "Authorization" : `Bearer ${token}`
        }
    });
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
