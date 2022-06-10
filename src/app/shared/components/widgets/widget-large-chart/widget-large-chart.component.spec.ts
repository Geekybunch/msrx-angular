import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetLargeChartComponent } from './widget-large-chart.component';

describe('WidgetLargeChartComponent', () => {
  let component: WidgetLargeChartComponent;
  let fixture: ComponentFixture<WidgetLargeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetLargeChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetLargeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
