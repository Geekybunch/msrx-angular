import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
    public pageSize = 10;
    public totalResults: number;
    public noRecords: any;

    dataSource = new MatTableDataSource<Patients>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private patientServices: PatientService) {}

    visibleColumns = displayedColumns;

    ngOnInit(): void {
        this.getplantsData();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    getplantsData() {
        this.paginator.pageSize = this.paginator.pageSize
            ? this.paginator.pageSize
            : 10;
        this.patientServices
            .getPatientDetails(
                this.paginator.pageSize,
                this.paginator.pageIndex + 1
            )
            .subscribe(
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
}
