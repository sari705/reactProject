import { axios } from 'axios'

let baseUrl = "https://nodeproject-gd82.onrender.com/api/user";

export function getAllUsers() {
    return axios.get(baseUrl);
}

export function getUser(id) {
    return axios.get(`${baseUrl}/${id}`)
}

export function logIn(body) {
    return axios.post(`${baseUrl}/logIn`, body)
}

export function signUp(body) {
    return axios.post(`${baseUrl}`, body)
}

export function updateUser(id, body) {
    return axios.put(`${baseUrl}/${id}`, body)
}

export function updatePassword(body) {
    return axios.put(baseUrl, body)
}