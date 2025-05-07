import { Component, OnInit } from '@angular/core';
import e from 'express';
import { CustomeserviceService } from '../Service/customer_service/customeservice.service';
import { ProductserviceService } from '../Service/product_service/productservice.service';
import { OrderserviceService } from '../Service/order_service/orderservice.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Products: any[] = [];
  Categorys: any[] = [];
  productName: string | null = null;
  selectedCategory: string | null = null;
  SearchProduct: any[] = [];
  selectedProducts: any[] = [];
  phone: string | null = null;
  phonenew: string | null = null;
  point!: number;
  showUserFormModal: boolean = false;
  showformNewCustomer: boolean = false;
  idcustomer!: number;
  nameCustomer: string | null = null;
  billDetails: any = [];
  data: any;
  
  // Phân trang
  pageSize: number = 6;  // Số sản phẩm mỗi trang
  currentPage: number = 1;  // Trang hiện tại
  totalPages: number = 1;  // Tổng số trang

  constructor(private productservice: ProductserviceService,
    private customerservice: CustomeserviceService,
    private order_service: OrderserviceService,
    private route: ActivatedRoute,
    private router: Router // thêm dòng này
    ) { }

  ngOnInit() {
    // 1. Lấy danh mục từ API (để hiện trong dropdown)
    this.productservice.getCatelogy().subscribe((data: any) => {
      this.Categorys = data;
    });

    // 2. Kiểm tra URL có categoryId không?
    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('id'); // Lấy id trên URL nếu có

      if (categoryId) {
        // Nếu có ID, gán selectedCategory để tìm kiếm
        this.selectedCategory = categoryId;
        this.searchProduct(); // Gọi hàm tìm kiếm sản phẩm theo danh mục
      } else {
        // Không có ID, hiển thị toàn bộ sản phẩm mặc định
        this.loadDefaultProducts();
      }
    });
  }


  loadDefaultProducts() {
    this.productservice.getproduct().subscribe((data: any) => {
      this.Products = data;
      this.totalPages = Math.ceil(this.Products.length / this.pageSize);  // Tính tổng số trang
      this.updatePagedProducts();
    });
  }


  searchProduct() {
    const hasName = this.productName && this.productName.trim() !== '';
    const hasCategory = this.selectedCategory && this.selectedCategory !== 'null';
    if (this.productName || this.selectedCategory) {
      this.productservice.SearchProduct(this.productName, this.selectedCategory).subscribe((data: any) => {
        this.Products = Array.isArray(data) ? data : [data];
        this.totalPages = Math.ceil(this.Products.length / this.pageSize);  // Tính tổng số trang
        this.currentPage = 1; 
        this.updatePagedProducts();
      });
    } else {
      this.loadDefaultProducts();
    }
  }

  updatePagedProducts() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.SearchProduct = this.Products.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedProducts();
    }
  }

  addProductToCart(product: any) {
    const cartData = localStorage.getItem('cart');
    let cart: any[] = cartData ? JSON.parse(cartData) : [];

    const existingProduct = cart.find(p => p.productId === product.productId);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Đã thêm vào giỏ hàng!');
  }
}
