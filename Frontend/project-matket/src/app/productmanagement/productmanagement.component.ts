import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { ProductserviceService } from '../Service/product_service/productservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-productmanagement',
  templateUrl: './productmanagement.component.html',
  styleUrl: './productmanagement.component.css'
})
export class ProductmanagementComponent implements OnInit {

  product: any = {
    productName: '',
    category: { categoryId: null },
    supplier: { supplierId: null },
    price: null,
    stockQuantity: null,
    notes: '',
    importPrice: null,
    importDate: null
  };
  products: any[] = [];
  showAddForm: boolean = false;
  categories: any[] = [];
  suppliers: any[] = [];
  isEditing: boolean = false;
  currentPage: number = 1;
  pageSize: number = 9; // số sản phẩm mỗi trang
  pagedProducts: any[] = [];
  totalPages: number = 0;

  ngOnInit(): void {
    this.loadCaterogy();
    this.loadSupplier();
    this.loadProduct();
  }

  constructor(private productService: ProductserviceService, private router: Router) { }
  goToCategory(): void {
    this.router.navigate(['/category']);
  }
  goToSupplier(): void {
    this.router.navigate(['/supplier']);
  }

  loadCaterogy() {
    this.productService.getCatelogy().subscribe(
      (data: any) => {
        this.categories = data
      }
    )
  }

  loadSupplier() {
    this.productService.getSupplier().subscribe(
      (data: any) => {
        this.suppliers = data;
      }
    )
  }

  updatePagedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedProducts = this.products.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedProducts();
    }
  }

  loadProduct() {
    this.productService.getproduct().subscribe(
      (data: any) => {
        this.products = data;
        this.totalPages = Math.ceil(this.products.length / this.pageSize);
        this.updatePagedProducts();
      }
    )
  }

  saveProduct(): void {
    if (this.isEditing) {
      this.productService.updateProduct(this.product).subscribe(
        (response) => {
          console.log('Sản phẩm đã được cập nhật:', response);
          alert("Cập nhật thành công")
          this.loadProduct();
          this.resetForm();
        },
        (error) => {
          console.error('Lỗi khi cập nhật sản phẩm:', error);
          alert("Cập nhật sản phẩm thất bại");
        }
      );
    } else {
      this.productService.SaveProduct(this.product).subscribe(
        (response) => {
          console.log('Sản phẩm đã được lưu:', response);
          alert("Thêm sản phẩm thành công")
          this.loadProduct();
          this.resetForm();
        },
        (error) => {
          console.error('Lỗi khi lưu sản phẩm:', error);
          alert("Lỗi khi lưu sản phẩm");
        }
      );
    }
  }

  editProduct(product: any): void {
    this.product = { ...product };
    this.isEditing = true;
    this.showAddForm = true;
  }

  closeForm(): void {
    this.showAddForm = false;
    this.isEditing = false;
    this.resetForm();
  }

  deleteProduct(productId: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
      this.productService.deleteproduct(productId).subscribe(
        (response) => {
          console.log('Sản phẩm đã được xóa:', response);
          alert("xóa thành công");
          this.loadProduct();
        },
        (error) => {
          console.error('Lỗi khi xóa sản phẩm:', error);
          alert("Lỗi khi xóa sản phẩm");
        }
      );
    }
  }

  resetForm(): void {
    this.product = {
      productName: '',
      category: { categoryId: null },
      supplier: { supplierId: null },
      price: null,
      stockQuantity: null,
      notes: '',
      importPrice: null,
      importDate: null
    };
    this.isEditing = false;
    this.showAddForm = false;
  }
}