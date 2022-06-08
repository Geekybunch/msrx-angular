import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees.component';
import { Route, RouterModule } from '@angular/router';
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
        CommonModule,
        RouterModule.forChild(employeesRoutes),
        SharedModule,
    ],
})
export class EmployeesModule {}
