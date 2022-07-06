import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'app/core/common/common.service';
import {
    DeliveryVehicleI,
    DisplayedDeliveryVehicleI,
} from 'app/core/dilevery-vehicle/delivery-vehicle.interface';
import { DileveryVehicleService } from 'app/core/dilevery-vehicle/dilevery-vehicle.service';
import { cloneDeep } from 'lodash';
import { AddDileveryVehiclesComponent } from './add-dilevery-vehicles/add-dilevery-vehicles.component';

@Component({
    selector: 'app-dilevery-vehicles',
    templateUrl: './dilevery-vehicles.component.html',
    styleUrls: ['./dilevery-vehicles.component.scss'],
})
export class DileveryVehiclesComponent implements OnInit {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild('sidenav') sideNav: MatSidenav;
    public pageSize = 10;
    public totalResults: number;
    public noRecords: any;
    public vehiclesDetails: any;

    visibleColumns = DisplayedDeliveryVehicleI;
    dataSource = new MatTableDataSource<DeliveryVehicleI>();

    constructor(
        private vehicleService: DileveryVehicleService,
        private matDialog: MatDialog,
        private snackBar: MatSnackBar,
        private commonService: CommonService
    ) {}

    ngOnInit(): void {
        this.vehiclesList();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    vehiclesList() {
        this.paginator.pageSize = this.paginator.pageSize
            ? this.paginator.pageSize
            : 10;
        let pageparams = `?limit=${this.paginator.pageSize}&page=${
            this.paginator.pageIndex + 1
        }`;

        this.vehicleService.listVehicles(pageparams).subscribe(
            (response: any) => {
                console.log(response);
                this.noRecords = response.data.vehicles.results;
                this.dataSource = response.data.vehicles.results;
                this.totalResults = response.data.vehicles.totalResults;
            },
            (err: any) => {
                console.log(err);
            }
        );
    }
    filterByBatchNumber(query: string): void {}

    createVehicle() {
        let addVehicle = this.matDialog.open(AddDileveryVehiclesComponent);
        addVehicle.afterClosed().subscribe((result) => {
            this.vehiclesList();
        });
    }
    modifyVehicle(vehiclesData) {
        let EditVehicle = this.matDialog.open(AddDileveryVehiclesComponent, {
            autoFocus: false,
            data: {
                vehiclesData: cloneDeep(vehiclesData),
            },
        });
        EditVehicle.afterClosed().subscribe((result) => {
            this.vehiclesList();
        });
    }
    deleteVehicle(id: string) {
        console.log(id);
        this.vehicleService.deleteVehicle(id).subscribe(
            (res) => {
                this.snackBar.open('Vehicles Deleted', 'Close', {
                    duration: 3000,
                });
                this.vehiclesList();
            },
            (err) => {
                console.log(err);
            }
        );
    }
    vehicleDetails(vehicle: any) {
        console.log(vehicle);
        this.vehiclesDetails = vehicle;
        // this.commonService.$passData.next(vehicle);
        this.sideNav.toggle();
    }
    closeDrawer(event) {
        this.sideNav.close();
    }
}
