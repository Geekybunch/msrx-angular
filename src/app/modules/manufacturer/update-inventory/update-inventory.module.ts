import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateInventoryComponent } from './update-inventory.component';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductDrawerModule } from 'app/modules/common/product-drawer/product-drawer.module';

@NgModule({
    declarations: [UpdateInventoryComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: UpdateInventoryComponent,
            },
        ]),
        ProductDrawerModule,
    ],
})
export class UpdateInventoryModule {}
