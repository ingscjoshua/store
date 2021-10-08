import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../interfaces/product.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiURL = 'http://localhost:3000';
  constructor(private  http:HttpClient) { }
  getPrpoducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiURL}/products`);
  }

  updateStock(productId:number,newStock:number):Observable<any>{
    const body = {"stock":newStock}
    return  this.http.patch<any>(`${this.apiURL}/products/${productId}`,body)
  }
}
