import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { Route, RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';

const productsRoutes: Route[] = [
    {
        path: '',
        component: ProductsComponent,
    },
];

@NgModule({
    declarations: [ProductsComponent],
    imports: [
        RouterModule.forChild(productsRoutes),
        MatPaginatorModule,
        CommonModule,
        MatTableModule,
        MatBadgeModule,
        MatButtonModule,
    ],
})
export class ProductsModule {}
