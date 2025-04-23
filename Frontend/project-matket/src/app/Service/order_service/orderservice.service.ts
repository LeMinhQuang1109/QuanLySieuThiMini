import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderserviceService {

  private apiSaveBill = "http://localhost:8081/saveBill"
  private apiSaveBillDetails = "http://localhost:8081/saveAllBillDetail"
  private apiGetBill = "http://localhost:8081/getBillByCustomerId"
  private apiGetBillDetail = "http://localhost:8081/getBillDetailByBillId"
  constructor( private http: HttpClient) { }
  
  addBill(customerId : number,day : string,totalBill: number){
    const body = {customerId,day,totalBill};
    return this.http.post(this.apiSaveBill,body);
  }

  saveBillDetail(body : any){
    return this.http.post(this.apiSaveBillDetails,body);
  }

  getBillByCusmoterId(customerId : number){
    const body = {customerId};
    return this.http.post(this.apiGetBill,body);
  }

  getBillDetail(billId : number){
    const body = {billId};
    return this.http.post(this.apiGetBillDetail,body);
  }
}