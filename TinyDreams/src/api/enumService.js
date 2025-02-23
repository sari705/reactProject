import axios  from "axios";

let baseUrl = "https://nodeproject-gd82.onrender.com/api/enums";


export function getCategories() {
    return axios.get(`${baseUrl}/categories`)
}