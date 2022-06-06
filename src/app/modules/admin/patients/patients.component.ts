import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { PatientService } from 'app/core/admin/patient/patient.service';
import { PlantsService } from 'app/core/admin/plants/plants.service';
import { Patients } from './patients.interfaces';
import { displayedColumns } from './patients.interfaces';

@Component({
    selector: 'app-patients',
    templateUrl: './patients.component.html',
    styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
    @ViewChild('sidenav') sideNav: MatSidenav;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    public pageSize = 20;
    public totalResults: number;
    public noRecords: any;
    public searchedPatient;
    public viewMoreDetails: any;
    dataSource = new MatTableDataSource<Patients>();
    constructor(
        private patientServices: PatientService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}
    visibleColumns = displayedColumns;

    ngOnInit(): void {
        this.getPatientsList();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    getPatientsList() {
        this.paginator.pageSize = this.paginator.pageSize
            ? this.paginator.pageSize
            : 20;
        const pageparams = `?limit=${this.paginator.pageSize}&page=${
            this.paginator.pageIndex + 1
        }`;
        const searchedName = this.searchedPatient
            ? `&name=${this.searchedPatient}`
            : '';
        const totalparams = `${pageparams + searchedName}`;

        this.patientServices.getPatientDetails(totalparams).subscribe(
            (response: any) => {
                this.noRecords = response.data.result.results;
                this.dataSource = response.data.result.results;
                this.totalResults = response.data.result.totalResults;
                console.log(response.data.result.results);
            },
            (err: any) => {
                console.log(err);
            }
        );
    }
    filterByPatientsName(query: string): void {
        console.log(query);
        this.searchedPatient = query;
        this.getPatientsList();
    }
    viewPrescription(event) {
        this.patientServices.prescription(event._id).subscribe(
            (response: any) => {
                this.viewMoreDetails = response.data.prescription;
                console.log(this.viewMoreDetails);
                this.sideNav.toggle();
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
