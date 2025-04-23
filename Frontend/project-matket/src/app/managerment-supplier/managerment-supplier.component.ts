import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductserviceService } from '../Service/product_service/productservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managerment-supplier',
  templateUrl: './managerment-supplier.component.html',
  styleUrl: './managerment-supplier.component.css'
})
export class ManagermentSupplierComponent {
  suppliers: any[] = []; // Danh sách nhà phân phối
  isEdit = false;
  showForm = false;
  supplier: any = {
    supplierName: '',
    phoneNumber: '',
    email: '',
    address: ''
  };
  selectedSupplierId: number | null = null; // ID của nhà phân phối được chọn
  currentPage: number = 1;
  pageSize: number = 8; // số sản phẩm mỗi trang
  pagedSupplier: any[] = [];
  totalPages: number = 0;

  constructor(private http: HttpClient, private productsService: ProductserviceService, private router: Router) { }
  resetForm() {
    this.supplier = {}; // reset object
    this.isEdit = false;
    this.showForm = true;
  }
  
  cancelEdit() {
    this.showForm = false;
    this.isEdit = false;
  }

  updateSuppliers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedSupplier = this.suppliers.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateSuppliers();
    }
  }
  
  goToProduct() {
    this.router.navigate(['/productmanagement']); // hoặc link phù hợp
  }
  goToCategory(): void {
    this.router.navigate(['/category']);
  }
  ngOnInit(): void {
    this.loadSupplier();

  }
  onSubmit(): void {
    this.productsService.saveSupplier(this.supplier).subscribe(
      res => {
        alert("Lưu thành công");
        this.loadSupplier();
      }
    )
  }

  loadSupplier() {
    this.productsService.getSupplier().subscribe(
      res => {
        this.suppliers = res;
        console.log(this.suppliers);
        this.totalPages = Math.ceil(this.suppliers.length / this.pageSize);
        this.updateSuppliers();
      }
    )
  }

   // Sửa nhà phân phối
   editSupplier(supplier: any) {
    this.isEdit = true;
    this.selectedSupplierId = supplier.supplierId;
    this.supplier = { ...supplier }; 
    this.showForm = true;
  }

  
   // Xóa nhà phân phối
deleteSupplier(supplierId: number): void {
  if (confirm('Bạn có chắc chắn muốn xóa nhà phân phối này không?')) {
    this.productsService.deleteSupplier(supplierId).subscribe(
      (response) => {
        console.log('Nhà phân phối đã được xóa:', response);
        alert("Xóa thành công");
        this.loadSupplier(); // Tải lại danh sách nhà phân phối sau khi xóa
      },
      (error) => {
        console.error('Lỗi:', error);
        alert("Lỗi khi xóa nhà phân phối");
      }
    );
  }
}

  
  
}
