import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductServices {
  private apiUrl= environment.apiUrl;
  constructor(private http: HttpClient){}
  get_products():Observable<any>{
    const token = localStorage.getItem('token');
    console.log("token is ", token);
    return this.http.get<any>(this.apiUrl+'/products/products');
  }
  add_products(data:any):Observable<any[]>{
    return this.http.post<any[]>(this.apiUrl+'/products/add-product', data);
  }
  update_products(id:number, data:any):Observable<any[]>{
    return this.http.post<any[]>(this.apiUrl+'/products/update-product', { id, ...data });
  }
  delete_product(id:number):Observable<any[]>{
    return this.http.delete<any>(`${this.apiUrl}/products/delete-product?id=${id}`);
  }
  get_products_id(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/products_id?id=${id}`);
  }
  setProductId(id: number) {
    localStorage.setItem("setProductId", id.toString());
  }
  getProductId() {
    const id= localStorage.getItem('setProductId');
    return Number(id);
  }

  add_file(data:any):Observable<any[]>{
    return this.http.post<any[]>(this.apiUrl+'/products/add-file', data);
  }
  
}
