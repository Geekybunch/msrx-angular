import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GrowerService } from 'app/core/employee/grower/grower.service';

@Component({
    selector: 'app-add-plants',
    templateUrl: './add-plants.component.html',
    styleUrls: ['./add-plants.component.scss'],
})
export class AddPlantsComponent implements OnInit {
    createPalntsForm: FormGroup;
    formFieldHelpers: string[] = [''];
    constructor(
        private growerService: GrowerService,
        private snackBar: MatSnackBar,
        private router: Router
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
    }
    addPlant() {
        if (this.createPalntsForm.invalid) {
            this.snackBar.open('Invalid Form', '');
            return;
        }
        this.growerService
            .createGrowerPlant(this.createPalntsForm.value)
            .subscribe((response: any) => {
                console.log(response);
                setTimeout(() => {
                    this.router.navigateByUrl('cultivator/plants');
                }, 1000);

                this.snackBar.open('Palnt Create Successfully..!', 'Close', {
                    duration: 1000,
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
