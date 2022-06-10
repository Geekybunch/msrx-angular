import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetLargeChartComponent } from './widget-large-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
    declarations: [WidgetLargeChartComponent],
    imports: [CommonModule, NgApexchartsModule],
    exports: [WidgetLargeChartComponent],
})
export class WidgetLargeChartModule {}
