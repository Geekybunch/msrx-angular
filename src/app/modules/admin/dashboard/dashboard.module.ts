import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Route, RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';

const dashboardRoutes: Route[] = [
    {
        path: '',
        component: DashboardComponent,
    },
];

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        RouterModule.forChild(dashboardRoutes),
        MatPaginatorModule,
        CommonModule,
        MatTableModule,
        MatBadgeModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        MatNativeDateModule,
        NgApexchartsModule,
        FormsModule,
    ],
})
export class DashboardModule {}
