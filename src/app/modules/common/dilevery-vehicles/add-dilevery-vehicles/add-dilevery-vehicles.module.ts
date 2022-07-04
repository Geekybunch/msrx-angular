import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDileveryVehiclesComponent } from './add-dilevery-vehicles.component';
import { SharedModule } from 'app/shared/shared.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@NgModule({
    declarations: [AddDileveryVehiclesComponent],
    imports: [CommonModule, SharedModule],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
    ],
})
export class AddDileveryVehiclesModule {}
