import { Component, OnInit } from '@angular/core';
import { CustomeserviceService } from '../Service/customer_service/customeservice.service';

@Component({
  selector: 'app-managerment-customer',
  templateUrl: './managerment-customer.component.html',
  styleUrls: ['./managerment-customer.component.css']
})
export class ManagermentCustomerComponent implements OnInit {
  customers: any[] = [];
  selectedCustomer: any | null = null;
  newCustomer: any = { customerId: 0, name: '', phone: '', point: 0 };
  currentPage: number = 1;
  pageSize: number = 10; // số sản phẩm mỗi trang
  pagedCustomers: any[] = [];
  totalPages: number = 0;

  constructor(private customerService: CustomeserviceService) {}

  ngOnInit(): void {
    this.getallCustomers();
  }

  // Lấy danh sách khách hàng
  getallCustomers(){
    this.customerService.getallCustomer().subscribe(
      (response) => {
        this.customers = response;
        this.totalPages = Math.ceil(this.customers.length / this.pageSize);
        this.updatePagedCustomer();
        console.log('Danh sách khách hàng:', this.customers);
      },
      (error) => {
        console.error('Lỗi khi lấy danh sách khách hàng:', error);
      }
    );
  }

  // Thêm khách hàng mới
  addCustomer(): void {
    this.customerService.newCustomer(this.newCustomer.name, this.newCustomer.phone, this.newCustomer.point).subscribe(
      (response) => {
        console.log('Khách hàng mới đã được thêm:', response);
        this.getallCustomers(); // Cập nhật danh sách
        this.newCustomer = { customerId: 0, name: '', phone: '', point: 0 }; // Reset form
        alert("thêm thành công");
      },
      (error) => {
        console.error('Lỗi khi thêm khách hàng mới:', error);
      }
    );
  }

  // Cập nhật khách hàng
  updateCustomer(): void {
    if (this.selectedCustomer) {
      this.customerService.updateCustomer(this.selectedCustomer).subscribe(
        (response) => {
          console.log('Khách hàng đã được cập nhật:', response);
          this.getallCustomers(); // Cập nhật danh sách
          this.selectedCustomer = null; // Reset selectedCustomer
          alert("Cập nhập thành công");
        },
        (error) => {
          console.error('Lỗi khi cập nhật khách hàng:', error);
        }
      );
    }
  }

  // Xóa khách hàng
  deleteCustomer(customerId: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
      this.customerService.deleteCustomer(customerId).subscribe(
        (response) => {
          console.log('Khách hàng đã được xóa:', response);
          alert("xóa thành công");
           // Cập nhật danh sách
           this.getallCustomers();
        },
        (error) => {
          console.error('Lỗi khi xóa khách hàng:', error);
        }
      );
    }
  }

  // Chọn khách hàng để chỉnh sửa
  selectCustomer(customer: any): void {
    this.selectedCustomer = { ...customer }; // Tạo bản sao để chỉnh sửa không ảnh hưởng tới danh sách
  }

  updatePagedCustomer(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedCustomers= this.customers.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedCustomer();
    }
  }
}
