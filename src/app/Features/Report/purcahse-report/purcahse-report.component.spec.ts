import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurcahseReportComponent } from './purcahse-report.component';

describe('PurcahseReportComponent', () => {
  let component: PurcahseReportComponent;
  let fixture: ComponentFixture<PurcahseReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurcahseReportComponent]
    });
    fixture = TestBed.createComponent(PurcahseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
