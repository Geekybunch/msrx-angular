import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { BusinessService } from 'app/core/admin/business/business.service';
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
    public businesses: any[] = [];
    public selectedBusiness;
    public selectedBusinessFrom;
    public selectedBusinessTo;
    public noRecords: any;
    public removeduplicateBusiness: string[] = [];
    visibleColumns = displayedColumns;
    dataSource = new MatTableDataSource<Deliveries>();
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        private deliveriesService: DeliveriesService,
        private businessService: BusinessService
    ) {}

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

                console.log(this.noRecords);
            },
            (err: any) => {
                console.log(err);
            }
        );
    }
    getBusinessDropDownlist = (businessName?: string): void => {
        let pageParams = '?limit=20&page=1';
        // if (businessName) {
        //     pageParams += '&businessName=' + businessName;
        // }
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
        console.log(event);
        this.sideNav.toggle();
    }
}
