/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Inject, OnInit } from '@angular/core';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AttendanceStatus } from 'app/core/attendance/attendance.enums';
import {
    AttendanceNoDataResponse,
    AttendanceResponse,
    AttendanceStatusObjectI,
} from 'app/core/attendance/attendance.interface';
import { AttendanceService } from 'app/core/attendance/attendance.service';

@Component({
    selector: 'app-update-attendance',
    templateUrl: './update-attendance.component.html',
    styleUrls: ['./update-attendance.component.scss'],
})
export class UpdateAttendanceComponent implements OnInit {
    AttendanceStatus = AttendanceStatus;
    employeeId: string;
    lastData: AttendanceStatusObjectI;
    workingHours = '0';
    employeeData: boolean = false;
    employeeDetails: any;
    attendanceDetails = [];
    constructor(
        private attendanceService: AttendanceService,
        private snackBar: MatSnackBar,
        private _fuseConfirmationService: FuseConfirmationService,
        @Inject(MAT_DIALOG_DATA) private data: { employeeId: string },
        private dialogRef: MatDialogRef<UpdateAttendanceComponent>
    ) {}

    ngOnInit(): void {
        this.employeeId = this.data.employeeId;
        this.getLastStatus();
    }

    getLastStatus() {
        this.attendanceService.getLastAttendance(this.employeeId).subscribe(
            (res: any) => {
                this.lastData = res.data.attendance;
                this.employeeDetails = res.data.employee;
                console.log('this.lastData', this.lastData);
                this.employeeData = true;
                if (!res.data.attendance) {
                    this.snackBar.open('No Record Found For Today', 'Close', {
                        duration: 3000,
                        panelClass: ['alert-red'],
                    });
                } else {
                    this.workingHours =
                        this.attendanceService.calculateWorkingTime(
                            this.lastData.attendanceStatus
                        );
                }
            },
            (err) => {
                console.log(err);
                this.snackBar.open(
                    'Unable to get attendance details',
                    'Close',
                    {
                        duration: 3000,
                        panelClass: ['alert-red'],
                    }
                );
            }
        );
    }

    saveAttendance(status: AttendanceStatus) {
        console.log(this.employeeId);
        return this.attendanceService
            .saveAttendance(status, this.employeeId)
            .subscribe(
                () => {
                    this.snackBar.open('Status Updated!', 'Close', {
                        duration: 3000,
                    });
                    this.dialogRef.close();
                },
                (err) => {
                    this._fuseConfirmationService.open({
                        title: 'Error',
                        message: err.error.message,
                        actions: {
                            confirm: {
                                show: false,
                            },
                            cancel: {
                                show: true,
                                label: 'Cancel',
                            },
                        },
                    });
                }
            );
    }

    get lastStatus() {
        if (!this.lastData) {
            return null;
        }
        return this.lastData.attendanceStatus[
            this.lastData.attendanceStatus.length - 1
        ];
    }

    get showWorkingButton() {
        if (!this.lastData) {
            return true;
        }

        return [
            AttendanceStatus.NOT_WORKING,
            AttendanceStatus.ON_BREAK,
        ].includes(this.lastStatus.status);
    }

    get showBreakButton() {
        if (!this.lastData) {
            return false;
        }
        return [AttendanceStatus.WORKING].includes(this.lastStatus.status);
    }

    get showDoneButton() {
        if (!this.lastData) {
            return false;
        }
        return [AttendanceStatus.WORKING, AttendanceStatus.ON_BREAK].includes(
            this.lastStatus.status
        );
    }
}
