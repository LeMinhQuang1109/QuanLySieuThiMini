import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagermentSupplierComponent } from './managerment-supplier.component';

describe('ManagermentSupplierComponent', () => {
  let component: ManagermentSupplierComponent;
  let fixture: ComponentFixture<ManagermentSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagermentSupplierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagermentSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
