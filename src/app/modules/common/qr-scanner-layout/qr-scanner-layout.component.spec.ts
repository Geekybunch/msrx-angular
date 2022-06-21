import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrScannerLayoutComponent } from './qr-scanner-layout.component';

describe('QrScannerLayoutComponent', () => {
  let component: QrScannerLayoutComponent;
  let fixture: ComponentFixture<QrScannerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrScannerLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrScannerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
