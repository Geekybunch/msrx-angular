import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveriesComponent } from './deliveries.component';
import { Route, RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

const deliveriesRoutes: Route[] = [
    {
        path: '',
        component: DeliveriesComponent,
    },
];

@NgModule({
    declarations: [DeliveriesComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(deliveriesRoutes),
        MatPaginatorModule,
        MatTableModule,
    ],
})
export class DeliveriesModule {}
