import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './Service/login_service/loginservice.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  [x: string]: any;
  role: string | null = null;
  title = 'project-matket';
  categories: any[] = [];
  suppliers: any[] = [];
  showDropdown = false;



  constructor(private http: HttpClient,
    private router: Router,
    private loginservice: LoginService,
  ) { }


  ngOnInit(): void {
    //this.role = localStorage.getItem('role');
    this.getCategories(),
      this.getallSupplier();
    this.http.get<any[]>('http://localhost:8080/api/product/get/category')
      .subscribe(data => {
        this.categories = data;
      });
  }

  getRole(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('userRole');
    }
    return null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  getCategories(): void {
    this.http.get<any[]>('http://localhost:8080/api/product/get/category') // sửa lại URL đúng của bạn
      .subscribe(data => {
        this.categories = data;
      });
  }

  getallSupplier(): void {
    this.http.get<any[]>('http://localhost:8080/api/product/get/supplier') // sửa lại URL đúng của bạn
      .subscribe(data => {
        this.suppliers = data;
      });
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('userRole');
      this.router.navigate(['/login']);
    }
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('userRole');
    }
    return false;
  }

}
