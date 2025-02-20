import {axios} from "axios";

let baseUrl = "https://nodeproject-gd82.onrender.com";

export function getAllProducts(index){
    return axios.get(baseUrl + "?limit=15&page=" + index);
}

export function getProduct(){
    return axios.get(`${baseUrl}/totalPages?limit=15`)
}

