import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  constructor(private http:HttpClient) { }

  getproduct(categoryId?: number): Observable<any>{
    return this.http.get<any>('http://localhost:8080/api/product/get/product');
  }

  SearchProduct(productName: string | null, categoryId: string | null): Observable<any> {
    let url = `http://localhost:8080/api/product/search/product`;
    if (productName && categoryId) {
      url += `?productName=${productName}&categoryId=${categoryId}`;
    } else if (productName) {
      url += `?productName=${productName}`;
    } else if (categoryId) {
      url += `?categoryId=${categoryId}`;
    }

    return this.http.get<any>(url);
  }

  getCatelogy(){
    return this.http.get<any>(`http://localhost:8080/api/product/get/category`);
  }

  getSupplier() {
    return this.http.get<any>(`http://localhost:8080/api/product/get/supplier`);
  }
  
  SaveProduct(product : any):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/api/product/saveproduct`,product);
  }

  updateProduct(Product:any):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/api/product/update/${Product.productId}`,Product);
  }
  
  deleteproduct(idproduct:  number):Observable<any>{
    return this.http.delete<any>(`http://localhost:8080/api/product/delete/${idproduct}`);
  }

  getProductById(idproduct: number):Observable<any>{
    return this.http.get<any>(`http://localhost:8080/api/product/getproductByid/${idproduct}`);
  }

  saveCategory(Category: any):Observable<any>{
    return this.http.post(`http://localhost:8080/api/product/savecategory`,Category);
  }

  updateCategory(Category:any):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/api/product/updateccatetegory/${Category.categoryId}`,Category);
  }

  deleteCategory(categoryId:  number):Observable<any>{
    return this.http.delete<any>(`http://localhost:8080/api/product/deletecategory/${categoryId}`);
  }

  saveSupplier(Supplier: any):Observable<any>{
    return this.http.post(`http://localhost:8080/api/product/savesupplier`,Supplier);
  }

  updateSupplier(Supplier:any):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/api/product/updateSupplier/${Supplier.supplierId}`,Supplier);
  }

  deleteSupplier(supplierId:  number):Observable<any>{
    return this.http.delete<any>(`http://localhost:8080/api/product/deleteSupplier/${supplierId}`);
  }
}
