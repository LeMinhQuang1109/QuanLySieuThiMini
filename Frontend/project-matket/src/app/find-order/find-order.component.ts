import { Component } from '@angular/core';
import { CustomeserviceService } from '../Service/customer_service/customeservice.service';
import { OrderserviceService } from '../Service/order_service/orderservice.service';
import { ProductserviceService } from '../Service/product_service/productservice.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-find-order',
  templateUrl: './find-order.component.html',
  styleUrl: './find-order.component.css'
})
export class FindOrderComponent implements OnInit{
  ngOnInit(): void {
    this.loadAllBills(); // Gọi hàm này khi component được load
  }

  find: string = "";
  customer: any;
  bills: any = [];
  selectedBillDetail: any = null;

  startDate: string = '';
  endDate: string = '';
  totalRevenue: number | null = null;
  startMonth: number = 1;
  endMonth: number = 1;
  selectedYear: number = new Date().getFullYear();
  monthlyRevenue: number[] = [];
  months: string[] = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", 
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ];
  showRevenueTable: boolean = false;


  constructor(
    private customerService: CustomeserviceService,
    private billService: OrderserviceService,
    private productService: ProductserviceService) { }


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

  loadAllBills(): void {
    this.billService.getAllBills().subscribe(
      (res: any) => {
        this.bills = res;
      },
      (error) => {
        console.error('Lỗi khi lấy danh sách hóa đơn:', error);
        alert("Lỗi khi lấy danh sách hóa đơn");
      }
    );
  }

  closeModal(): void {
    this.selectedBillDetail = null;
  }

  getPaymentMethodDisplay(method: string): string {
    switch (method) {
      case 'cash': return 'Tiền mặt';
      case 'card': return 'Thẻ';
      case 'transfer': return 'Chuyển khoản';
      default: return method;
    }
  }

  //Mới
  getMonthlyRevenue(): void {
    if (!this.selectedYear) return;
    this.billService.getMonthlyRevenue(this.selectedYear).subscribe({
      next: (revenue: number[]) => {
        this.monthlyRevenue = revenue;
      },
      error: (error) => {
        console.error('Lỗi khi lấy doanh thu hàng tháng:', error);
        alert("Lỗi khi lấy doanh thu hàng tháng");
      }
    })
    this.showRevenueTable = true;
  }

  closeRevenueTable() {
    this.showRevenueTable = false;
    this.monthlyRevenue = [];
  }
}