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
  pageSize: number = 6;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private productservice: ProductserviceService,
    private customerservice: CustomeserviceService,
    private order_service: OrderserviceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.productservice.getCatelogy().subscribe((data: any) => {
      this.Categorys = data;
    });

    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('id');

      if (categoryId) {
        this.selectedCategory = categoryId;
        this.searchProduct();
      } else {
        this.loadDefaultProducts();
      }
    });
  }


  loadDefaultProducts() {
    this.productservice.getproduct().subscribe((data: any) => {
      this.Products = data;
      this.totalPages = Math.ceil(this.Products.length / this.pageSize);
      this.updatePagedProducts();
    });
  }

  updatePagedProducts() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.SearchProduct = this.Products.slice(startIndex, endIndex);
  }


  searchProduct() {
    if (!this.selectedCategory && !this.productName) {
      this.loadDefaultProducts();
      return;
    }

    const searchTerm = this.productName ? this.productName.trim().toLowerCase() : '';
    const categoryId = this.selectedCategory && this.selectedCategory !== 'null'
      ? this.selectedCategory
      : null;

    if (searchTerm || categoryId) {
      this.productservice.getproduct().subscribe((allProducts: any[]) => {
        // Lọc sản phẩm theo điều kiện
        this.Products = allProducts.filter(product => {
          // Kiểm tra danh mục nếu được chọn
          const matchesCategory = !categoryId || product.category.categoryId == categoryId;

          // Kiểm tra tên sản phẩm nếu có từ khóa
          const matchesName = !searchTerm ||
            product.productName.toLowerCase().includes(searchTerm);

          return matchesCategory && matchesName;
        });

        this.totalPages = Math.ceil(this.Products.length / this.pageSize);
        this.currentPage = 1;
        this.updatePagedProducts();
      });
    } else {
      this.loadDefaultProducts();
    }
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
