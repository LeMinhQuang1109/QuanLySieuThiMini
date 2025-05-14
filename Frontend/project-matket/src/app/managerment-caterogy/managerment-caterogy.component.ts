import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductserviceService } from '../Service/product_service/productservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-managerment-caterogy',
  templateUrl: './managerment-caterogy.component.html',
  styleUrl: './managerment-caterogy.component.css'
})
export class ManagermentCaterogyComponent {
  categories: any[] = [];
  isEdit = false;
  category: any = {
    categoryName: '',
    description: ''
  };
  showAddForm: boolean = false; 
  isEditing: boolean = false;
  selectedCategoryId: number | null = null;
  currentPage: number = 1;
  pageSize: number = 10; // số sản phẩm mỗi trang
  pagedCategory: any[] = [];
  totalPages: number = 0;

  constructor(private http: HttpClient, private productsService: ProductserviceService, private router: Router) { }
  goToProduct() {
    this.router.navigate(['/productmanagement']);
  }

  goToSupplier(): void {
    this.router.navigate(['/supplier']);
  }

  cancelEdit() {
    this.showAddForm = false;
    this.isEdit = false;
  }

  ngOnInit(): void {
    this.loadCategory();

  }

  
  onSubmit(): void {
    this.productsService.saveCategory(this.category).subscribe(
      res => {
        alert("Lưu thành công");
        this.loadCategory();
      }
    )
  }

  updatePagedCategory(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedCategory = this.categories.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedCategory();
    }
  }
  
  loadCategory() {
    this.productsService.getCatelogy().subscribe(
      res => {
        this.categories = res;
        console.log(this.categories);
        
        this.totalPages = Math.ceil(this.categories.length / this.pageSize);
        this.updatePagedCategory();

      }
    )
  }

  closeForm():void{
    this.showAddForm = false;
    this.isEditing = false;
    this.onReset();
  }
  // Sửa nhà phân phối
  editCategory(category: any) {
    this.isEdit = true;
    this.selectedCategoryId = category.categoryId;
    this.category = { ...category };
    this.showAddForm = true;
  }

  deleteCategory(categoryId: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa danh mục này không?')) {
      this.productsService.deleteCategory(categoryId).subscribe(
        (response) => {
          console.log('Danh mục đã được xóa:', response);
          alert("Xóa thành công");
          this.loadCategory();
        },
        (error) => {
          console.error('Lỗi:', error);
          alert("Lỗi khi xóa danh mục");
        }
      );
    }
  }
   // Reset form
   onReset(): void {
    this.isEdit = false;
    this.showAddForm = true;  // Hiển thị form
    this.selectedCategoryId = null;
    this.category = { categoryName: '', description: '' };
  }

  
}

