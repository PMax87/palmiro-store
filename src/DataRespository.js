import axios from "axios";

export class DataRepository {

  static getProductsCategory() {
    const request = "https://fakestoreapi.com/products/categories";
    return axios.request(request); 
  }

  static getProdByCategory(specCategory) {
    const request = `https://fakestoreapi.com/products/category/${specCategory}`
    return axios.request(request)
  }

  static getProductData(id) {
    const request = `https://fakestoreapi.com/products/${id}`
    return axios.request(request)
  }

}
