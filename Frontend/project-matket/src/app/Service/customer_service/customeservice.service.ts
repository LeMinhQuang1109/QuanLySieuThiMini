import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomeserviceService {

  constructor(private http: HttpClient) { }
  CheckCustomer(phone: string):Observable<boolean>{
    const data = {phone}
    return this.http.post<any>(`http://localhost:8082/api/customer/checkcustomer`,data);
  }

  getCustomer(phone: string):Observable<any>{
    const data = {phone}
    return this.http.post<any>(`http://localhost:8082/api/customer/getCustomer`,data);
  }

  updatePointCustomer(idCustomer: number, point : number):Observable<any>{
    const body = { point };
    return this.http.put<any>( `http://localhost:8082/api/customer/updatepoint/${idCustomer}`,body)
  }

  newCustomer(name: string , phone : string, point :number): Observable<any>{
    const body = {name, phone, point}
     return this.http.post<any>(`http://localhost:8082/api/customer/saveCustomer`,body);
  }

  getCustomerByID(idCustomer: number): Observable<any>{
    return this.http.get<any>( `http://localhost:8082/api/customer/getCustomer/${idCustomer}`)
  }

  getallCustomer(){
    return this.http.get<any>(`http://localhost:8082/api/customer/get/customer`);
  }

  updateCustomer(Customer:any):Observable<any>{
    return this.http.post<any>(`http://localhost:8082/api/customer/update/${Customer.customerId}`,Customer);
  }

  deleteCustomer(customerId:  number):Observable<any>{
    return this.http.delete<any>(`http://localhost:8082/api/customer/delete/${customerId}`);
  }
}

