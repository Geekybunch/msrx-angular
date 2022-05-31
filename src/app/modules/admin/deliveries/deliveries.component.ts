import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { DeliveriesService } from 'app/core/admin/deliveries/deliveries.service';
import { Deliveries } from './deliveries.interfaces';
import { displayedColumns } from './deliveries.interfaces';

@Component({
    selector: 'app-deliveries',
    templateUrl: './deliveries.component.html',
    styleUrls: ['./deliveries.component.scss'],
})
export class DeliveriesComponent implements OnInit {
    @ViewChild('sidenav') sideNav: MatSidenav;
    public pageSize = 10;
    public totalResults: number;
    public deliveryDetails: any;
    public filterType: string;
    public filterName: string;
    public filterApproved: boolean;

    visibleColumns = displayedColumns;

    dataSource = new MatTableDataSource<Deliveries>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private deliveriesService: DeliveriesService) {}

    ngOnInit(): void {
        this.getDeliveriesData();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    getDeliveriesData() {
        this.paginator.pageSize = this.paginator.pageSize
            ? this.paginator.pageSize
            : 10;
        this.deliveriesService
            .getDeliveriesList(
                this.paginator.pageSize,
                this.paginator.pageIndex + 1
            )
            .subscribe(
                (response: any) => {
                    this.dataSource = response.data.deliveries.results;
                    this.totalResults = response.data.deliveries.totalResults;
                    console.log(this.dataSource);
                },
                (err: any) => {
                    console.log(err);
                }
            );
    }
    filterBytype(change: MatSelectChange): void {
        this.filterType = change.value;
        this.getDeliveriesData();
    }
    filterByName(query: string): void {
        this.filterName = query;
        this.getDeliveriesData();
    }
    toggleApproved(change: MatSlideToggleChange): void {
        this.filterApproved = change.checked;
        this.getDeliveriesData();
    }
    viewDetails(event) {
        this.deliveryDetails = event;
        console.log(event);
        this.sideNav.toggle();
    }
}
