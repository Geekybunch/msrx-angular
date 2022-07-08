import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'app/core/common/common.service';
import { AddWelnessDetails } from 'app/core/wellness/wellness.interface';
import { WellnessService } from 'app/core/wellness/wellness.service';
import moment from 'moment';

@Component({
    selector: 'app-update-wellness-profile',
    templateUrl: './update-wellness-profile.component.html',
    styleUrls: ['./update-wellness-profile.component.scss'],
})
export class UpdateWellnessProfileComponent implements OnInit {
    profileUpdateForm: FormGroup;
    wellnessData: any;
    businesses;
    states: string[] = [];
    cities: string[] = [];
    isModify = false;
    selectedDays: string[] = [];
    days = moment.weekdays();

    constructor(
        private commonService: CommonService,
        private wellnessService: WellnessService,
        private changeDetectionRef: ChangeDetectorRef,
        private snackBar: MatSnackBar,
        private router: Router,
        private matDialog: MatDialog
    ) {
        // this.loadStates();
    }

    ngOnInit(): void {
        this.profileUpdateForm = new FormGroup({
            name: new FormControl(),
            addressLine1: new FormControl(),
            city: new FormControl(),
            zipCode: new FormControl(),
            state: new FormControl(
                {
                    value: 'Mississippi',
                    disabled: true,
                },
                [Validators.required]
            ),
            openTime: new FormControl(),
            closeTime: new FormControl(),
            timeSlotLength: new FormControl(),
            patientsPerSlot: new FormControl(),
            about: new FormControl(),
            latitude: new FormControl(null, Validators.required),
            longitude: new FormControl(null, Validators.required),
        });
        this.getCenterDetails();
    }
    getCenterDetails() {
        this.wellnessService.getWellnessCenterProfile().subscribe((res) => {
            if (res.data.wellnessCenter) {
                this.isModify = true;
                this.selectedDays = res.data.wellnessCenter.workingDays;
                const copy: any = res.data.wellnessCenter;

                this.profileUpdateForm.patchValue(copy);

                this.profileUpdateForm.get('state').setValue('Mississippi');
                this.changeDetectionRef.detectChanges();

                const coordinates =
                    res.data.wellnessCenter.location?.coordinates;
                if (coordinates && coordinates.length) {
                    this.profileUpdateForm
                        .get('longitude')
                        .setValue(coordinates[0]);
                    this.profileUpdateForm
                        .get('latitude')
                        .setValue(coordinates[1]);
                }
            }
        });
        this.loadStates();
    }
    async loadStates() {
        this.states = await this.commonService.getState();
        if (this.states.length) {
            this.cities = await this.commonService.getCitiesByState(
                'Mississippi'
            );
            this.changeDetectionRef.detectChanges();
            this.profileUpdateForm.get('city').setValue(this.cities[0]);
            this.changeDetectionRef.detectChanges();
        }
    }

    toggleDay(day: string) {
        const idx = this.selectedDays.indexOf(day);

        if (idx === -1) {
            this.selectedDays.push(day);
        } else {
            this.selectedDays.splice(idx, 1);
        }
    }

    saveProfile() {
        if (this.profileUpdateForm.invalid) {
            this.snackBar.open('Invalid Form', 'Close', {
                duration: 2000,
                panelClass: ['alert-red'],
            });

            return;
        }
        // if (this.latitude.invalid || this.longitude.invalid) {
        //     this.snackBar.open('Invalid Coordinates', 'Close', {
        //         duration: 2000,
        //         panelClass: ['alert-red'],
        //     });
        //     return;
        // }
        const data: AddWelnessDetails = this.profileUpdateForm.getRawValue();

        delete (data as any).latitude;
        delete (data as any).longitude;

        data.zipCode = '' + data.zipCode;
        data.workingDays = this.selectedDays;
        this.wellnessService.updateWellnessCenterProfile(data).subscribe(
            (res) => {
                this.snackBar.open('Data Updated', 'Close', {
                    duration: 3000,
                });
                setTimeout(() => {
                    this.router.navigateByUrl(
                        '/wellnesscenter/wellness-center-details'
                    );
                }, 1500);
            },
            (err: any) => {
                console.log(err);
            }
        );
    }
}
