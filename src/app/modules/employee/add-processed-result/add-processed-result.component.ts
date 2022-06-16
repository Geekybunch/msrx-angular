import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EXTRANCTION_METHODS } from 'app/core/processor/processor.enums';
import { CreateProccessResultRequest } from 'app/core/processor/processor.interface';
import { ProcessorService } from 'app/core/processor/processor.service';
import moment from 'moment';

@Component({
    selector: 'app-add-processed-result',
    templateUrl: './add-processed-result.component.html',
    styleUrls: ['./add-processed-result.component.scss'],
})
export class AddProcessedResultComponent implements OnInit {
    processedForm: FormGroup;
    plantID: string;
    file: File;
    fileAttr = 'Choose File';
    isModify = false;
    EXTRANCTION_METHODS = EXTRANCTION_METHODS;
    constructor(
        private processorService: ProcessorService,
        private _matDialogRef: MatDialogRef<AddProcessedResultComponent>,
        private snackBar: MatSnackBar,
        private activatedRouter: ActivatedRoute,
        private router: Router
    ) {
        this.activatedRouter.queryParams.subscribe((qParams) => {
            this.plantID = qParams.plantID;
        });
    }
    test(eve: any) {
        console.log(eve);
    }

    ngOnInit(): void {
        this.processedForm = new FormGroup({
            extractionMethodUsed: new FormControl(null, Validators.required),
            ingredients: new FormControl(null, Validators.required),
            approved: new FormControl(null, Validators.required),
            processDateTime: new FormControl(
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
            this.getPlantDetails();
        }
    }
    getPlantDetails() {
        this.processorService.getSavedTest(this.plantID).subscribe((res) => {
            if (!res.data.plantProcess) {
                return;
            }

            this.processedForm.patchValue(res.data.plantProcess);
            this.processedForm.disable();
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

    saveProcessed() {
        if (this.processedForm.invalid) {
            this.snackBar.open('Invalid Form', 'Close', {
                duration: 2000,
                panelClass: ['alert-red'],
            });
            return;
        }

        const req: CreateProccessResultRequest = this.processedForm.value;

        this.processorService
            .saveProcessTestResult(this.plantID, req)
            .subscribe(
                (res) => {
                    setTimeout(() => {
                        this.router.navigateByUrl('processor/plants');
                    }, 1500);
                    this._matDialogRef.close();
                    this.snackBar.open(
                        'Palnt Process Successfully..!',
                        'Close',
                        {
                            duration: 3000,
                        }
                    );
                },
                (err: any) => {
                    console.log(err);
                    this.snackBar.open(err.error.message, 'Close', {
                        duration: 3000,
                        panelClass: ['alert-red'],
                    });
                    // this._matDialogRef.close();
                }
            );
    }
}
