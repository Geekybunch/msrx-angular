import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeliveryVehicleI } from 'app/core/dilevery-vehicle/delivery-vehicle.interface';
import { DileveryVehicleService } from 'app/core/dilevery-vehicle/dilevery-vehicle.service';

@Component({
    selector: 'app-add-dilevery-vehicles',
    templateUrl: './add-dilevery-vehicles.component.html',
    styleUrls: ['./add-dilevery-vehicles.component.scss'],
})
export class AddDileveryVehiclesComponent implements OnInit {
    vehicleForm: FormGroup;
    oldData: DeliveryVehicleI;
    constructor(
        private snackBar: MatSnackBar,
        private vehicleService: DileveryVehicleService,
        private matDialog: MatDialog,
        @Inject(MAT_DIALOG_DATA)
        private data: { vehiclesData: DeliveryVehicleI }
    ) {}

    ngOnInit(): void {
        this.vehicleForm = new FormGroup({
            vehicleNumber: new FormControl(null, Validators.required),
            vehicleId: new FormControl(null, Validators.required),
            vehicleType: new FormControl(null, Validators.required),
            vehicleColor: new FormControl(null, Validators.required),
            vehiclePermit: new FormControl(null, Validators.required),
        });
        console.log(this.data);

        if ((this.oldData = this.data.vehiclesData)) {
            this.setOldData();
        }
    }
    setOldData() {
        this.vehicleForm.patchValue(this.oldData);
    }

    saveVehicle() {
        if (this.vehicleForm.invalid) {
            this.snackBar.open('Invalid Form', 'Close', {
                duration: 3000,
                panelClass: ['alert-red'],
            });
            return;
        }
        if (this.oldData) {
            this.vehicleService
                .updateVehicles(this.oldData._id, this.vehicleForm.value)
                .subscribe(
                    (res) => {
                        this.snackBar.open('Vehicle updated', 'Close', {
                            duration: 3000,
                        });
                        this.matDialog.closeAll();
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        } else {
            this.vehicleService.saveVehicle(this.vehicleForm.value).subscribe(
                (res) => {
                    console.log(res);
                    this.snackBar.open('Vehicle added', 'Close', {
                        duration: 3000,
                    });
                    this.matDialog.closeAll();
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }
}
