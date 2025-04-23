import { Component, OnInit } from '@angular/core';
import { CustomeserviceService } from '../Service/customer_service/customeservice.service';
import { OrderserviceService } from '../Service/order_service/orderservice.service';
import { log } from 'console';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  selectedProducts: any[] = [];
  phone : string | null= null;
  phonenew : string | null= null;
  point!: number;
  showUserFormModal: boolean = false;
  showformNewCustomer: boolean = false;
  idcustomer!: number;
  nameCustomer : string | null = null;
  billDetails : any = [];
  data : any;

  constructor(private customerservice: CustomeserviceService, private order_service: OrderserviceService) {}

  ngOnInit(): void {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.selectedProducts = JSON.parse(cartData);
    }
  }

  removeProduct(index: number) {
    this.selectedProducts.splice(index, 1);
    this.saveCart();
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.selectedProducts));
  }

  confirmPurchase() {
    this.showUserFormModal = true;
    this.saveCart();
  }

  
  checkCustomer() {
    if (this.phone) {      
      this.customerservice.CheckCustomer(this.phone).subscribe(
        (response) => {
          if (response) {
            if(this.phone){
              this.customerservice.getCustomer(this.phone).subscribe(
                (customerResponse) => {
                  console.log(customerResponse);
                  const totalQuantity = this.selectedProducts.reduce((sum, product) => sum + (product.quantity || 1), 0);
                  const pointsToAdd = totalQuantity * 100;
                  customerResponse.point += pointsToAdd;
                  this.point = customerResponse.point;
                  this.idcustomer = customerResponse.customerId;
                  console.log(customerResponse.point);
                  let totalprice = 0;
                  for(let i =0;i<this.selectedProducts.length;i++){
                    totalprice += +this.selectedProducts[i].price * +this.selectedProducts[i].quantity;
                    console.log(+this.selectedProducts[i].price);
                    console.log(+this.selectedProducts[i].quantity);
                    console.log(totalprice);
                  }
                  const day : Date = new Date();
                  console.log(day.toUTCString());
                  this.saveBill(this.idcustomer,day.toUTCString(),totalprice);
    
                  this.customerservice.updatePointCustomer(this.idcustomer, this.point).subscribe(
                    (updateResponse) => {
                      console.log('Đã cập nhật điểm');
                      alert("Cập nhật điểm thành công");
                      this.showUserFormModal = false;
                    },
                    (error) => {
                      console.error('Lỗi khi cập nhật điểm', error);
                      alert("Lỗi khi cập nhật điểm");
                    }
                  );
                },
                (error) => {
                  console.error('Lỗi khi lấy thông tin khách hàng', error);
                  alert("Lỗi khi lấy thông tin khách hàng");
                }
              );
            }
          } else {
            this.showformNewCustomer = true;
          }
        },
        (error) => {
          console.error('Lỗi khi kiểm tra khách hàng', error);
          alert("Lỗi khi kiểm tra khách hàng");
        }
      );
    } else {
      console.error('Vui lòng nhập số điện thoại');
      alert("Vui lòng nhập đầy đủ thông tin");
    }
  }
  
  createNewCustomer() {
    if (this.phonenew && this.nameCustomer) {
      this.customerservice.CheckCustomer(this.phonenew).subscribe()
      this.customerservice.newCustomer(this.nameCustomer, this.phonenew, this.point).subscribe(
        (createResponse) => {
          console.log('Đã tạo mới khách hàng', createResponse);
          alert("Đã tạo khách hàng mới");
          this.idcustomer = createResponse.customerId;
          this.point = createResponse.point;

          const totalQuantity = this.selectedProducts.reduce((sum, product) => sum + (product.quantity || 1), 0);
          const pointsToAdd = totalQuantity * 100;
          this.point += pointsToAdd;
          let totalprice = 0;
          for(let i =0;i<this.selectedProducts.length;i++){
            totalprice += +this.selectedProducts[i].price * +this.selectedProducts[i].quantity;
            console.log(+this.selectedProducts[i].price);
            console.log(+this.selectedProducts[i].quantity);
            console.log(totalprice);
          }
          const day : Date = new Date();
          console.log(day.toUTCString());
          this.saveBill(this.idcustomer,day.toUTCString(),totalprice);
          this.customerservice.updatePointCustomer(this.idcustomer, this.point).subscribe(
            (updateResponse) => {
              console.log('Đã cập nhật điểm cho khách hàng mới');
              alert("Đã cập nhật điểm cho khách hàng mới");
              this.showformNewCustomer = false;
              this.showUserFormModal = false;
            },
            (error) => {
              console.error('Lỗi khi cập nhật điểm cho khách hàng mới', error);
              alert("Lỗi khi cập nhật điểm cho khách hàng mới");
            }
          );
        },
        (error) => {
          console.error('Lỗi khi tạo mới khách hàng', error);
          alert("Lỗi khi tạo mới khách hàng");
        }
      );
    } else {
      console.error('Vui lòng nhập đầy đủ thông tin');
      alert("Vui lòng nhập đầy đủ thông tin");
    }
  }

  saveBill(customerId: number, day: string, totalBill: number) {
    this.order_service.addBill(customerId, day, totalBill).subscribe((res) => {
      this.data = res;

      for (let i = 0; i < this.selectedProducts.length; i++) {
        const productId = this.selectedProducts[i].productId;
        const quantity = this.selectedProducts[i].quantity;
        const billId = this.data.billId;
        const body = { productId, quantity, billId };
        this.billDetails.push(body);
      }
      this.order_service.saveBillDetail(this.billDetails).subscribe((res) => {
        console.log('Chi tiết hóa đơn đã được lưu:', res);
        this.selectedProducts = [];
        this.saveCart();
      });
    });
  }

 
}
