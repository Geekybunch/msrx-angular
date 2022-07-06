import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveTestResult } from 'app/core/tester/tester.interface';
import { TesterService } from 'app/core/tester/tester.service';
import moment from 'moment';

@Component({
    selector: 'app-add-test-result',
    templateUrl: './add-test-result.component.html',
    styleUrls: ['./add-test-result.component.scss'],
})
export class AddTestResultComponent implements OnInit {
    testForm: FormGroup;
    plantID: string;
    file: File;
    fileAttr = 'Choose File';
    isModify = false;
    constructor(
        private testerService: TesterService,
        private _matDialogRef: MatDialogRef<AddTestResultComponent>,
        private snackBar: MatSnackBar,
        private activatedRouter: ActivatedRoute,
        private router: Router
    ) {
        this.activatedRouter.queryParams.subscribe((qParams) => {
            this.plantID = qParams.plantID;
        });
    }

    ngOnInit(): void {
        this.testForm = new FormGroup({
            coa: new FormControl(null, Validators.required),
            approved: new FormControl(null, Validators.required),
            notes: new FormControl(null, Validators.required),
            testDateTime: new FormControl(
                moment().toISOString(),
                Validators.required
            ),
            discardedWeight: new FormControl(null, Validators.required),
        });
        if (!this.plantID) {
            this.snackBar.open('Could not find Plant ID', 'Close', {
                duration: 2000,
                panelClass: ['alert-red'],
            });

            return;
        } else {
            // this.snackBar.open(`Plant ID: ${this.plantID}`, 'Close', {
            //     duration: 2000,
            //     panelClass: ['alert-red'],
            // });

            this.getPlantDetails();
        }
    }
    fileSelected(files) {
        this.file = files.target.files.item(0);
        this.testForm.get('coa').setValue(this.file.name);
    }
    getPlantDetails() {
        this.testerService.getSavedTest(this.plantID).subscribe((res) => {
            if (!res.data.plantTest) {
                return;
            }

            this.testForm.patchValue(res.data.plantTest);
            this.testForm.disable();
            this.isModify = true;
            this.snackBar.open(
                'Cannot update test once saved, Disabled!!',
                'Close',
                {
                    duration: 2000,
                    panelClass: ['alert-red'],
                }
            );
        });
    }

    saveTest() {
        if (this.testForm.invalid || !this.file) {
            this.snackBar.open('Invalid Form', 'Close', {
                duration: 2000,
                panelClass: ['alert-red'],
            });
            return;
        }
        const req: SaveTestResult = this.testForm.value;
        req.coa = this.file;
        this.testerService.saveTestResult(this.plantID, req).subscribe(
            (res) => {
                setTimeout(() => {
                    this.router.navigateByUrl('tester/plants');
                }, 1500);
                this._matDialogRef.close();
                this.snackBar.open('Plant Tested Successfully..!', 'Close', {
                    duration: 3000,
                });
            },
            (err: any) => {
                this.snackBar.open(err.error.message, 'Close', {
                    duration: 3000,
                    panelClass: ['alert-red'],
                });
                // this._matDialogRef.close();
            }
        );
    }
}
