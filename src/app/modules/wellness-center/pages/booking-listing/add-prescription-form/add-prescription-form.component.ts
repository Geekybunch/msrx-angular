import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BookingI } from 'app/core/booking/booking.interfaces';
import { CommonService } from 'app/core/common/common.service';
import { WellnessService } from 'app/core/wellness/wellness.service';

@Component({
    selector: 'app-add-prescription-form',
    templateUrl: './add-prescription-form.component.html',
    styleUrls: ['./add-prescription-form.component.scss'],
})
export class AddPrescriptionFormComponent implements OnInit {
    prescriptionForm: FormGroup;
    bookingDetails: any;
    prescriptionData: any;

    constructor(
        private snackBar: MatSnackBar,
        private wellnessService: WellnessService,
        private matDialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) private bookingData: { booking: BookingI }
    ) {}

    ngOnInit(): void {
        this.prescriptionForm = new FormGroup({
            dosage: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.required),
        });
        this.bookingDetails = this.bookingData.booking;
    }

    savePrescription() {
        if (this.prescriptionForm.invalid) {
            this.snackBar.open('Invalid Form', 'Close', {
                duration: 2000,
                panelClass: ['alert-red'],
            });
            return;
        }
        this.wellnessService
            .savePrescription(
                this.bookingDetails._id,
                this.prescriptionForm.value
            )
            .subscribe(
                (response: any) => {
                    console.log(response);
                    this.wellnessService.$addPrescriptionData.next(response);
                    this.matDialog.closeAll();
                },
                (err: any) => {
                    this.snackBar.open(err.error.message, 'Close', {
                        duration: 3000,
                        panelClass: ['alert-red'],
                    });
                }
            );
    }

    onlyNumber(event: any): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
}
