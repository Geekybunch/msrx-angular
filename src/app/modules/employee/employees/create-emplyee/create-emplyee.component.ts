import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeI } from 'app/core/auth/auth.interface';
import { EmployeeAdminService } from 'app/core/employee-admin/employee-admin.service';

import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'app-create-emplyee',
    templateUrl: './create-emplyee.component.html',
    styleUrls: ['./create-emplyee.component.scss'],
})
export class CreateEmplyeeComponent implements OnInit {
    formFieldHelpers: string[] = [''];
    createForm: FormGroup;

    constructor(
        private employeService: EmployeeAdminService,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) private data: { employeeData: EmployeeI },
        private matDialogRef: MatDialogRef<CreateEmplyeeComponent>
    ) {}

    ngOnInit(): void {
        this.createForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            idNumber: new FormControl(null, [Validators.required]),
            type: new FormControl(null, Validators.required),
        });
        if (this.data && this.data.employeeData) {
            this.createForm.patchValue(this.data.employeeData);
        }
        console.log(this.data.employeeData);
    }
    saveEmployee() {
        this.employeService
            .updateEmploye(this.data.employeeData._id, this.createForm.value)
            .subscribe(
                (res: any) => {
                    this.matDialogRef.close();
                    this.snackBar.open(
                        'Employees Update Successfully..!',
                        'Close',
                        {
                            duration: 2000,
                        }
                    );
                    console.log(res);
                },
                (err: any) => {
                    console.log(err);
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
