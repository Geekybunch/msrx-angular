import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import {
    CreateDileveryI,
    DisplayedDileveryI,
} from 'app/core/distributer/distributer.interface';
import { DistributerService } from 'app/core/distributer/distributer.service';

@Component({
    selector: 'app-past-dileviries',
    templateUrl: './past-dileviries.component.html',
    styleUrls: ['./past-dileviries.component.scss'],
})
export class PastDileviriesComponent implements OnInit {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild('sidenav') sideNav: MatSidenav;
    @Input() position: 'start' | 'end';
    public pageSize = 10;
    public totalResults: number;
    public filterName: string;
    public deliveryDetails: any;
    public noRecords: any;
    public businesses: any[] = [];
    public selectedBusiness;
    public selectedBusinessFrom;
    public selectedBusinessTo;

    visibleColumns = DisplayedDileveryI;
    dataSource = new MatTableDataSource<CreateDileveryI>();

    constructor(private distributerService: DistributerService) {}

    ngOnInit(): void {
        this.getPastDilevieris();
        this.getBusinessDropDownlist();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    getPastDilevieris() {
        this.paginator.pageSize = this.paginator.pageSize
            ? this.paginator.pageSize
            : 10;
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
        this.distributerService.listDeliveries(totalparams).subscribe(
            (response: any) => {
                console.log(response);
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
        this.distributerService.listDeliveries(pageParams).subscribe(
            (response: any) => {
                console.log(response);
                this.businesses = response.data.deliveries.results;
                const filteredArr = this.businesses.reduce((thing, current) => {
                    const x = thing.find(
                        (item) =>
                            item.from.businessName === current.from.businessName
                    );
                    if (!x) {
                        return thing.concat([current]);
                    } else {
                        return thing;
                    }
                }, []);
                this.businesses = filteredArr;
                console.log(this.businesses);
            },
            (err: any) => {
                console.log(err);
            }
        );
    };

    filterByBusiness(): void {
        console.log(this.selectedBusiness);
        this.getPastDilevieris();
    }
    filterByBusinessFrom() {
        this.getPastDilevieris();
    }
    filterByBusinessTo() {
        this.getPastDilevieris();
    }

    filterByName(query: string): void {
        this.filterName = query;
        this.getPastDilevieris();
    }

    openDeliveryDetails(event) {
        console.log(event);
        this.deliveryDetails = event;
        this.sideNav.toggle();
    }
}
