import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagermentCustomerComponent } from './managerment-customer.component';

describe('ManagermentCustomerComponent', () => {
  let component: ManagermentCustomerComponent;
  let fixture: ComponentFixture<ManagermentCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagermentCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagermentCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
