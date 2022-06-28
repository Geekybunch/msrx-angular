import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { EmployeesService } from 'app/core/admin/employees/employees.service';
import { BookingI, BookingList } from 'app/core/booking/booking.interfaces';
import { BookingService } from 'app/core/booking/booking.service';
import { CommonService } from 'app/core/common/common.service';
import { BOOKIN_STATUS } from 'app/core/wellness/bookin.enums';
import { WellnessService } from 'app/core/wellness/wellness.service';
import { cloneDeep } from 'lodash';
import { AddPrescriptionFormComponent } from './add-prescription-form/add-prescription-form.component';

@Component({
    selector: 'app-booking-listing',
    templateUrl: './booking-listing.component.html',
    styleUrls: ['./booking-listing.component.scss'],
})
export class BookingListingComponent implements OnInit {
    BOOKIN_STATUS = BOOKIN_STATUS;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild('sidenav') sideNav: MatSidenav;
    public pageSize = 10;
    public totalResults: number;
    public filterApproved: boolean;
    public statusChange: any;
    public bookingDetails: any;
    public noRecords: any;
    dataSource = new MatTableDataSource<BookingI>();
    constructor(
        private employeesService: EmployeesService,
        private bookingService: BookingService,
        private snackBar: MatSnackBar,
        private wellnessService: WellnessService,
        private commonService: CommonService,
        private _fuseConfirmationService: FuseConfirmationService,
        private matDialog: MatDialog
    ) {}

    visibleColumns = BookingList;

    ngOnInit(): void {
        this.getBookings();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    getBookings() {
        this.paginator.pageSize = this.paginator.pageSize
            ? this.paginator.pageSize
            : 10;
        let pageparams = `?limit=${this.paginator.pageSize}&page=${
            this.paginator.pageIndex + 1
        }`;

        this.bookingService.getWellnessBooking(pageparams).subscribe(
            (response: any) => {
                console.log(response);
                this.noRecords = response.data.bookings.results;
                this.dataSource = response.data.bookings.results;
                this.totalResults = response.data.bookings.totalResults;
            },
            (err: any) => {
                console.log(err);
            }
        );
    }
    saveToDb(
        booking: BookingI,
        id: string,
        status: BOOKIN_STATUS,
        reason?: string
    ) {
        this.wellnessService
            .updateBookingStatus(id, status, reason)
            .subscribe((res) => {
                this.snackBar.open('Booking updated', 'Close', {
                    duration: 3000,
                });
                booking.status = status;
            });
    }
    markPatientVisited(booking, id: string, status: BOOKIN_STATUS, time: Date) {
        this.wellnessService
            .markPatientVisited(id, status, time)
            .subscribe((res) => {
                this.snackBar.open('Marked Patient Visit', 'Close', {
                    duration: 3000,
                });

                booking.status = status;
                booking.patientVisitedTime = time;
            });
    }

    async updateBooking(status: BOOKIN_STATUS, booking: BookingI) {
        let reason: string;
        if (status === BOOKIN_STATUS.VISITED) {
            this.markPatientVisited(booking, booking._id, status, new Date());
        }
        // if (status === BOOKIN_STATUS.REJECTED) {
        //     // const alert = await this.alertCtrl.create({
        //     //     header: 'Enter Rejection Reason',
        //     //     inputs: [
        //     //         {
        //     //             placeholder: 'Reason',
        //     //         },
        //     //     ],
        //     //     buttons: [
        //     //         {
        //     //             text: 'Cancel',
        //     //             role: 'cancel',
        //     //         },
        //     //         {
        //     //             text: 'Done',
        //     //         },
        //     //     ],
        //     // });
        //     alert.onDidDismiss().then((val) => {
        //         try {
        //             reason = val?.data?.values[0];
        //             this.saveToDb(booking, booking._id, status, reason);
        //         } catch (error) {}
        //     });
        //     await alert.present();
        // } else if (status === BOOKIN_STATUS.VISITED) {
        //     this.markPatientVisited(booking, booking._id, status, new Date());
        // } else {
        //     this.saveToDb(booking, booking._id, status);
        // }
    }

    toggleApproved(change: MatSlideToggleChange): void {
        this.filterApproved = change.checked;
        this.getBookings();
    }
    changeStatus(business: any) {
        if (business.isApproved === true) {
            this.statusChange = false;
        } else {
            this.statusChange = true;
        }
        let obj = {
            isApproved: this.statusChange,
        };
        this.employeesService.changeEmployeeStatus(business._id, obj).subscribe(
            (response: any) => {
                this.snackBar.open('Status Changed Successfully..!', 'Close', {
                    duration: 2500,
                });
                this.getBookings();
            },
            (err: any) => {
                console.log(err);
            }
        );
    }
    addPrescription(booking: BookingI) {
        let addPrescription = this.matDialog.open(
            AddPrescriptionFormComponent,
            {
                autoFocus: false,
                data: {
                    booking: cloneDeep(booking),
                },
            }
        );
        addPrescription.afterClosed().subscribe((result) => {
            this.getBookings();
        });
    }
    seePrescription(booking: any) {
        this.commonService.getPrescription(booking._id).subscribe(
            (response: any) => {
                this.sideNav.toggle();
                this.bookingDetails = response.data.prescription;
                console.log(response);
            },
            (error) => {
                this._fuseConfirmationService.open({
                    title: error.error.code,
                    message: error.error.message,
                    actions: {
                        confirm: {
                            show: false,
                            label: 'Confirm',
                            color: 'warn',
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
}
