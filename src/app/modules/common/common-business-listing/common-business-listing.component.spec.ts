import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonBusinessListingComponent } from './common-business-listing.component';

describe('CommonBusinessListingComponent', () => {
  let component: CommonBusinessListingComponent;
  let fixture: ComponentFixture<CommonBusinessListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonBusinessListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonBusinessListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
