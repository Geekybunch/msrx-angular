import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'app/core/common/common.service';
import { DispensaryService } from 'app/core/dispensary/dispensary.service';
import { AddWelnessDetails } from 'app/core/wellness/wellness.interface';
import { WellnessService } from 'app/core/wellness/wellness.service';
import moment from 'moment';

@Component({
    selector: 'app-update-profile',
    templateUrl: './update-profile.component.html',
    styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit {
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
        private dispensaryService: DispensaryService,
        private changeDetectionRef: ChangeDetectorRef,
        private snackBar: MatSnackBar,
        private router: Router,
        private matDialog: MatDialog
    ) {
        this.loadStates();
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
        this.dispensaryService.getDisposerProfileData().subscribe((res) => {
            if (res.data.dispensary) {
                this.isModify = true;

                const copy: any = res.data.dispensary;

                this.profileUpdateForm.patchValue(copy);

                this.profileUpdateForm.get('state').setValue('Mississippi');
                this.changeDetectionRef.detectChanges();

                const coordinates = res.data.dispensary.location?.coordinates;
                if (coordinates && coordinates.length) {
                    this.profileUpdateForm
                        .get('longitude')
                        .setValue(coordinates[0]);
                    this.profileUpdateForm
                        .get('latitude')
                        .setValue(coordinates[1]);
                }
                console.log(this.profileUpdateForm.getRawValue());
            }
        });
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

    saveProfile() {
        console.log(this.profileUpdateForm.value);
        if (this.profileUpdateForm.invalid) {
            this.snackBar.open('Invalid Form', 'Close', {
                duration: 2000,
                panelClass: ['alert-red'],
            });
            console.log(this.profileUpdateForm);
            return;
        }
        const data: AddWelnessDetails = this.profileUpdateForm.getRawValue();
        delete (data as any).latitude;
        delete (data as any).longitude;
        data.zipCode = '' + data.zipCode;
        data.workingDays = this.selectedDays;
        this.dispensaryService.saveDisposerProfileData(data).subscribe(
            (res) => {
                console.log('data saved');
                this.snackBar.open('Data Updated', 'Close', {
                    duration: 3000,
                });
                setTimeout(() => {
                    this.router.navigateByUrl(
                        '/dispensary/dispensary-center-detail'
                    );
                }, 1500);
            },
            (err: any) => {
                console.log(err);
            }
        );
    }
}
