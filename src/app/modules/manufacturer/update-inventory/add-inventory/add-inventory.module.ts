import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddInventoryComponent } from './add-inventory.component';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [AddInventoryComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: AddInventoryComponent,
            },
        ]),
    ],
})
export class AddInventoryModule {}
