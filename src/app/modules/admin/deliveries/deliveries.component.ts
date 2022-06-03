import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
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
    public businesses: any[] = [];
    public selectedBusiness;
    public selectedBusinessFrom;
    public selectedBusinessTo;
    public noRecords: any;
    visibleColumns = displayedColumns;
    dataSource = new MatTableDataSource<Deliveries>();
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private deliveriesService: DeliveriesService) {}

    ngOnInit(): void {
        this.getDeliveriesData();
        this.getBusinessDropDownlist();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    getDeliveriesData() {
        this.paginator.pageSize = this.paginator.pageSize
            ? this.paginator.pageSize
            : 20;

        let pageparams = `?limit=${this.paginator.pageSize}&page=${
            this.paginator.pageIndex + 1
        }`;
        let business = this.selectedBusiness
            ? `&business=${this.selectedBusiness}`
            : '';
        let businessFrom = this.selectedBusinessFrom
            ? `&from=${this.selectedBusinessFrom}`
            : '';
        let businessTo = this.selectedBusinessTo
            ? `&to=${this.selectedBusinessTo}`
            : '';

        let totalparams = `${
            pageparams + business + businessFrom + businessTo
        }`;
        this.deliveriesService.getDeliveriesList(totalparams).subscribe(
            (response: any) => {
                this.noRecords = response.data.deliveries.results;
                this.dataSource = response.data.deliveries.results;
                this.totalResults = response.data.deliveries.totalResults;
            },
            (err: any) => {
                console.log(err);
            }
        );
    }
    getBusinessDropDownlist = (businessName?: string): void => {
        let pageParams = '?limit=20&page=1';
        this.deliveriesService.getDeliveriesList(pageParams).subscribe(
            (response: any) => {
                this.businesses = response.data.deliveries.results;
                const filteredArr = this.businesses.reduce((thing, current) => {
                    const x = thing.find(
                        (item) =>
                            item.business.businessName ===
                            current.business.businessName
                    );
                    if (!x) {
                        return thing.concat([current]);
                    } else {
                        return thing;
                    }
                }, []);
                this.businesses = filteredArr;
            },
            (err: any) => {
                console.log(err);
            }
        );
    };

    filterByBusiness(): void {
        console.log(this.selectedBusiness);
        this.getDeliveriesData();
    }
    filterByBusinessFrom() {
        this.getDeliveriesData();
    }
    filterByBusinessTo() {
        this.getDeliveriesData();
    }
    viewDetails(event) {
        this.deliveryDetails = event;
        this.sideNav.toggle();
    }
}
