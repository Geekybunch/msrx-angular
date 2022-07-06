import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddManufacturerComponent } from './add-manufacturer.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { PlantsDrawerModule } from 'app/modules/common/plants-drawer/plants-drawer.module';

@NgModule({
    declarations: [AddManufacturerComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: AddManufacturerComponent,
            },
        ]),
        PlantsDrawerModule,
    ],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
    ],
    exports: [AddManufacturerComponent],
})
export class AddManufacturerModule {}
