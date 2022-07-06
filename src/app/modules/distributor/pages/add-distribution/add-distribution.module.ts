import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDistributionComponent } from './add-distribution.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductDrawerModule } from 'app/modules/common/product-drawer/product-drawer.module';

const addDistributionRoutes: Route[] = [
    {
        path: '',
        component: AddDistributionComponent,
    },
];

@NgModule({
    declarations: [AddDistributionComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(addDistributionRoutes),
        SharedModule,
        ProductDrawerModule,
    ],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
    ],
})
export class AddDistributionModule {}
