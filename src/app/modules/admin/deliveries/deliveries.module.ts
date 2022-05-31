import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveriesComponent } from './deliveries.component';
import { Route, RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
        MatButtonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatDividerModule,
        MatInputModule,
        MatSelectModule,
    ],
})
export class DeliveriesModule {}
