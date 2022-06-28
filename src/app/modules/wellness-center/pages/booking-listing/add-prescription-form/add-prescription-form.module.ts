import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPrescriptionFormComponent } from './add-prescription-form.component';
import { SharedModule } from 'app/shared/shared.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@NgModule({
    declarations: [AddPrescriptionFormComponent],
    imports: [CommonModule, SharedModule],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
    ],
})
export class AddPrescriptionFormModule {}
