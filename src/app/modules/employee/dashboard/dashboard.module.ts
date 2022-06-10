import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Route, RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'app/shared/shared.module';
import { WidgetLargeChartModule } from 'app/shared/components/widgets/widget-large-chart/widget-large-chart.module';

const dashboardRoutes: Route[] = [
    {
        path: '',
        component: DashboardComponent,
    },
];

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(dashboardRoutes),
        NgApexchartsModule,
        SharedModule,
        WidgetLargeChartModule,
    ],
})
export class DashboardModule {}
