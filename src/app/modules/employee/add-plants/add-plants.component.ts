import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CreatePlantRequest } from 'app/core/grower/grower.interface';
import { GrowerService } from 'app/core/grower/grower.service';
import moment from 'moment';

@Component({
    selector: 'app-add-plants',
    templateUrl: './add-plants.component.html',
    styleUrls: ['./add-plants.component.scss'],
})
export class AddPlantsComponent implements OnInit {
    createPalntsForm: FormGroup;
    formFieldHelpers: string[] = [''];
    modify = false;
    public editPlantData = this.data;
    constructor(
        private growerService: GrowerService,
        private snackBar: MatSnackBar,
        private router: Router,
        @Inject(MAT_DIALOG_DATA) private data: { plantData: any },
        private _matDialogRef: MatDialogRef<AddPlantsComponent>
    ) {}

    ngOnInit(): void {
        this.createPalntsForm = new FormGroup({
            batchNumber: new FormControl(null, Validators.required),
            geneticStain: new FormControl(null, Validators.required),
            geneticCompany: new FormControl(null, Validators.required),
            nutrientManufacture: new FormControl(null, Validators.required),
            phase: new FormControl(null, Validators.required),
            wetWeight: new FormControl(null, Validators.required),
            dryWeight: new FormControl(null, Validators.required),
            discardedWeight: new FormControl(null, Validators.required),
        });
        if (this.editPlantData.plantData) {
            console.log(
                'this.editPlantData.plantData',
                Object.keys(this.editPlantData.plantData.phase)[0]
            );
            this.modify = true;
            this.createPalntsForm.patchValue(this.editPlantData.plantData);
            console.log(Object.keys(this.editPlantData.plantData.phase)[0]);
            this.createPalntsForm.patchValue({
                phase: Object.keys(this.editPlantData.plantData.phase)[0],
            });
            // this.createPalntsForm
            //     .get('phase')
            //     .setValue(Object.keys(this.editPlantData.plantData.phase)[0]);
        }
    }
    addPlant() {
        if (this.createPalntsForm.invalid) {
            this.snackBar.open('Invalid Form', 'Close', {
                duration: 2000,
                panelClass: ['alert-red'],
            });
            return;
        }
        const req: CreatePlantRequest = this.createPalntsForm.value;

        const phase = this.editPlantData.plantData?.phase || {};
        const phaseAdd = this.createPalntsForm.value.phase || {};

        // phase[(req as any).phase] = moment().format('YYYY-MM-DD');
        let ex;
        if (this.editPlantData.plantData) {
            ex = {
                [phase]: moment().format('YYYY-MM-DD'),
            };
        } else {
            ex = {
                [phaseAdd]: moment().format('YYYY-MM-DD'),
            };
        }
        req.phase = ex;

        if (this.modify) {
            this._matDialogRef.close();
            this.growerService
                .updatePlant(this.editPlantData.plantData._id, req)
                .subscribe(
                    (res) => {
                        this.snackBar.open(
                            'Palnt Updated Successfully..!',
                            'Close',
                            {
                                duration: 2000,
                            }
                        );
                    },
                    (err: any) => {
                        this._matDialogRef.close();
                        console.log(err);
                    }
                );
            return;
        }

        this.growerService.createGrowerPlant(req).subscribe((response: any) => {
            console.log(response);
            setTimeout(() => {
                this.router.navigateByUrl('cultivator/plants');
            }, 1500);

            this.snackBar.open('Palnt Create Successfully..!', 'Close', {
                duration: 2000,
            });
        });
    }

    onlyNumber(event: any): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
}
