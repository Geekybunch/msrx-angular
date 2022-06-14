import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListingComponent } from './product-listing.component';
import { SharedModule } from 'app/shared/shared.module';
import { Route, RouterModule } from '@angular/router';

const productListingRoutes: Route[] = [
    {
        path: '',
        component: ProductListingComponent,
    },
];

@NgModule({
    declarations: [ProductListingComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(productListingRoutes),
    ],
})
export class ProductListingModule {}
