import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import {
    DeliveryVehicleI,
    DisplayedDeliveryVehicleI,
} from 'app/core/dilevery-vehicle/delivery-vehicle.interface';
import { DileveryVehicleService } from 'app/core/dilevery-vehicle/dilevery-vehicle.service';

@Component({
    selector: 'app-dilevery-vehicles',
    templateUrl: './dilevery-vehicles.component.html',
    styleUrls: ['./dilevery-vehicles.component.scss'],
})
export class DileveryVehiclesComponent implements OnInit {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild('sidenav') sideNav: MatSidenav;
    public pageSize = 20;
    public totalResults: number;
    public noRecords: any;

    visibleColumns = DisplayedDeliveryVehicleI;
    dataSource = new MatTableDataSource<DeliveryVehicleI>();

    constructor(private vehicleService: DileveryVehicleService) {}

    ngOnInit(): void {
        this.vehiclesList();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    vehiclesList() {
        this.paginator.pageSize = this.paginator.pageSize
            ? this.paginator.pageSize
            : 20;
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
}
