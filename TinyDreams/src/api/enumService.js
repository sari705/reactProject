import axios  from "axios";

let baseUrl = "https://nodeproject-gd82.onrender.com/api/enums";


export function getCategories() {
    return axios.get(`${baseUrl}/categories`)
}

export function getTags() {
    return axios.get(`${baseUrl}/tags`)
}

export function getColors() {
    return axios.get(`${baseUrl}/colors`)
}