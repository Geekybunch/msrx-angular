import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { GrowerService } from 'app/core/employee/grower/grower.service';

import { GrowerPlant } from 'app/core/employee/grower/grower.interface';
import { DisplayedPlant } from 'app/core/employee/grower/grower.interface';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { cloneDeep } from 'lodash';
import { AddPlantsComponent } from '../add-plants/add-plants.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-plants',
    templateUrl: './plants.component.html',
    styleUrls: ['./plants.component.scss'],
})
export class PlantsComponent implements OnInit {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild('sidenav') sideNav: MatSidenav;
    public pageSize = 20;
    public totalResults: number;
    public noRecords: any;
    public viewDetails: any;
    public filterbatchNumber: string;
    public geneticStainTypes: any;
    dataSource = new MatTableDataSource<GrowerPlant>();
    visibleColumns = DisplayedPlant;
    constructor(
        private plantsServices: GrowerService,
        private matDialog: MatDialog,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.getPlantsData();
    }
    getPlantsData(): void {
        this.paginator.pageSize = this.paginator.pageSize
            ? this.paginator.pageSize
            : 20;

        const pageparams = `?limit=${this.paginator.pageSize}&page=${
            this.paginator.pageIndex + 1
        }`;
        const batchNumber = this.filterbatchNumber
            ? `&batchNumber=${this.filterbatchNumber}`
            : '';
        const totalparams = `${pageparams + batchNumber}`;

        this.plantsServices.getplantsDetails(totalparams).subscribe(
            (response: any) => {
                console.log(response);
                this.noRecords = response.data.result.results;
                this.dataSource = response.data.result.results;
                this.totalResults = response.data.result.totalResults;
            },
            (err: any) => {
                console.log(err);
            }
        );
    }

    sideToggle(event): void {
        this.viewDetails = event;
        console.log(event);
        this.sideNav.toggle();
    }

    filterByBatchNumber(query: string): void {
        this.filterbatchNumber = query;
        this.getPlantsData();
    }

    filterByCompany(query: string): void {
        this.getPlantsData();
    }
    toggleplantTest(change: MatSlideToggleChange): void {
        this.getPlantsData();
    }

    toggleplantprocess(change: MatSlideToggleChange): void {
        this.getPlantsData();
    }
    openPlantDialog(plantData: any) {
        let EditPlant = this.matDialog.open(AddPlantsComponent, {
            autoFocus: false,
            data: {
                plantData: cloneDeep(plantData),
            },
        });
        EditPlant.afterClosed().subscribe((result) => {
            this.getPlantsData(); // Pizza!
        });
    }
    deletePlant(plantId: any) {
        this.plantsServices.deleteGrowerPlant(plantId).subscribe(
            (res) => {
                console.log(res);
                this.getPlantsData();
                this.snackBar.open('Plant Deleted Successfully..!', 'Close', {
                    duration: 2000,
                });
            },
            (err: any) => {
                this.snackBar.open(err.error.message, 'Close', {
                    duration: 2000,
                    panelClass: ['alert-red'],
                });
                console.log(err);
            }
        );
    }
}
