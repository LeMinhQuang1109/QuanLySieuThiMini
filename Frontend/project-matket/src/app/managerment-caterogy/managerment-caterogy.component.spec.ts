import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagermentCaterogyComponent } from './managerment-caterogy.component';

describe('ManagermentCaterogyComponent', () => {
  let component: ManagermentCaterogyComponent;
  let fixture: ComponentFixture<ManagermentCaterogyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagermentCaterogyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagermentCaterogyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
