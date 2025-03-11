import axios from 'axios'

let baseUrl = "https://nodeproject-gd82.onrender.com/api/user";

export function getAllUsers(token) {
    return axios.get(baseUrl, {
        headers: {
            "Authorization" :`Bearer ${token}`
        }
    });
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

export function updateUser(id, { username, email }, token) {
    return axios.put(`${baseUrl}/${id}`, { username, email }, {
        headers: {
            authorization: `Bearer ${token}`,
        }
    })
}

export function updatePassword(body) {
    return axios.put(baseUrl, body)
}

export function getUserByToken(token) {
    return axios.get(`${baseUrl}/me`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        credentials: "include"
    })
}