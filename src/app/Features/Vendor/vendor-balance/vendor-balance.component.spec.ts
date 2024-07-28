import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBalanceComponent } from './vendor-balance.component';

describe('VendorBalanceComponent', () => {
  let component: VendorBalanceComponent;
  let fixture: ComponentFixture<VendorBalanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorBalanceComponent]
    });
    fixture = TestBed.createComponent(VendorBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
