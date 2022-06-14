import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddManufacturerComponent } from './add-manufacturer.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [AddManufacturerComponent],
    imports: [CommonModule, SharedModule],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
    ],
})
export class AddManufacturerModule {}
