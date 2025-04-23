import { Component } from '@angular/core';
import { CustomeserviceService } from '../Service/customer_service/customeservice.service';
import { OrderserviceService } from '../Service/order_service/orderservice.service';
import { ProductserviceService } from '../Service/product_service/productservice.service';

@Component({
  selector: 'app-find-order',
  templateUrl: './find-order.component.html',
  styleUrl: './find-order.component.css'
})
export class FindOrderComponent {
  find: string = "";
  customer: any;
  bills: any = [];
  selectedBillDetail: any = null;
  startDate: string = '';
  endDate: string = '';
  totalRevenue: number | null = null;

  constructor(private customerService: CustomeserviceService, private billService: OrderserviceService, private productService: ProductserviceService) { }

  findOrder() {
    if (this.find) {
      this.customerService.CheckCustomer(this.find).subscribe(
        (response) => {
          if (response) {
            if (this.find) {
              this.customerService.getCustomer(this.find).subscribe(
                (customerResponse) => {
                  this.customer = customerResponse
                  this.billService.getBillByCusmoterId(this.customer.customerId).subscribe(
                    res => {
                      this.bills = res;
                    }
                  )
                },
                (error) => {
                  console.error('Lỗi khi lấy thông tin khách hàng', error);
                  alert("Lỗi khi lấy thông tin khách hàng");
                }
              );
            }
          }
        },
        (error) => {
          console.error('Lỗi khi kiểm tra khách hàng', error);
          alert("Lỗi khi kiểm tra khách hàng");
        }
      );
    } else {
      console.error('Vui lòng nhập số điện thoại');
      alert("Vui lòng nhập số điện thoại");
    }
  }

  getBillDetail(billId: number) {
    console.log(billId);
    this.billService.getBillDetail(billId).subscribe(
      (data: any) => {
        if (data && data.length > 0) {
          const bill = data[0].bill;
          const details = data.map((item: any) => ({
            billDetailId: item.billDetailId,
            productId: item.productId,
            quantity: item.quantity,
            productName: '' // Khởi tạo tên sản phẩm
          }));

          // Gán thông tin hóa đơn và chi tiết sản phẩm
          this.selectedBillDetail = {
            ...bill,
            details: details,
            customerName: ''
          };

          // Gọi API để lấy thông tin khách hàng
          this.customerService.getCustomerByID(bill.customerId).subscribe(
            (customerData: any) => {
              this.selectedBillDetail.customerName = customerData.name;
            },
            (error) => {
              console.error('Lỗi khi lấy thông tin khách hàng:', error);
              alert("Lỗi khi lấy thông tin khách hàng");
            }
          );

          this.selectedBillDetail.details.forEach((detail: any) => {
            this.productService.getProductById(detail.productId).subscribe(
              (productData: any) => {
                detail.productName = productData.productName;
                console.log(detail.productName);

              },
              (error) => {
                console.error('Lỗi khi lấy thông tin sản phẩm:', error);
                alert("Lỗi khi lấy thông tin sản phẩm");
              }
            );
          });
        }
      },
      (error) => {
        console.error('Lỗi khi lấy chi tiết hóa đơn:', error);
        alert("Lỗi khi lấy chi tiết hóa đơn");
      }
    );
  }

  closeModal(): void {
    this.selectedBillDetail = null;
  }

  getRevenue(): void {
    if (!this.startDate || !this.endDate) {
      alert("Vui lòng chọn đầy đủ ngày bắt đầu và kết thúc.");
      return;
    }
  
    // Gọi hàm API trong billService
    this.billService.getDoanhThu(this.startDate, this.endDate).subscribe({
      next: (revenue: number) => {
        this.totalRevenue = revenue;
      },
      error: (error) => {
        console.error('Lỗi khi tính doanh thu:', error);
        alert("Lỗi khi tính doanh thu");
      }
    });
  }
}