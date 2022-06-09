import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees.component';
import { Route, RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';

const employeesRoutes: Route[] = [
    {
        path: '',
        component: EmployeesComponent,
    },
];

@NgModule({
    declarations: [EmployeesComponent],
    imports: [
        RouterModule.forChild(employeesRoutes),
        MatPaginatorModule,
        CommonModule,
        MatTableModule,
        MatBadgeModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatMenuModule,
        MatInputModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
    ],
})
export class EmployeesModule {}
