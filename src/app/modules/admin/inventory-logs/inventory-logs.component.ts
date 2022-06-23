import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { BusinessService } from 'app/core/admin/business/business.service';
import { InventoryLogsService } from 'app/core/admin/inventory-logs/inventory-logs.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Businesses, displayedColumns } from './inventory-logs.interfaces';

@Component({
    selector: 'app-inventory-logs',
    templateUrl: './inventory-logs.component.html',
    styleUrls: ['./inventory-logs.component.scss'],
})
export class InventoryLogsComponent implements OnInit {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild('sidenav') sideNav: MatSidenav;
    public pageSize = 20;
    public totalResults: number;
    public noRecords: any;
    public statusChange: any;
    public selectedBusiness;
    public businesses: string[] = [];
    public businessInput = new Subject<string>();
    public viewMoreDetails: any;
    visibleColumns = displayedColumns;
    dataSource = new MatTableDataSource<Businesses>();

    constructor(
        private inventoryService: InventoryLogsService,
        private businessService: BusinessService
    ) {}

    ngOnInit(): void {
        this.getInventoryLogsList();
        this.getBusinessDropDownlist();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    getInventoryLogsList() {
        this.paginator.pageSize = this.paginator.pageSize
            ? this.paginator.pageSize
            : 10;

        let pageparams = `?limit=${this.paginator.pageSize}&page=${
            this.paginator.pageIndex + 1
        }`;
        let business = this.selectedBusiness
            ? `&businessId=${this.selectedBusiness}`
            : '';

        let totalparams = `${pageparams + business}`;
        this.inventoryService.getInventoryLogs(totalparams).subscribe(
            (response: any) => {
                console.log(response);
                this.noRecords = response.data.quantity.results;
                this.dataSource = response.data.quantity.results;
                this.totalResults = response.data.quantity.totalResults;
            },
            (err: any) => {
                console.log(err);
            }
        );
    }
    getBusinessDropDownlist = (businessName?: string): void => {
        console.log('get businesses');
        let pageParams = '?limit=5&page=1&businessType=Manufacturer';
        if (businessName) {
            pageParams += '&businessName=' + businessName;
        }
        this.businessService.getBusinessDetails(pageParams).subscribe(
            (response: any) => {
                console.log(response);
                this.businesses = response.data.businesses.results.map(
                    (obj: any) => ({
                        _id: obj._id,
                        businessName: obj.businessName,
                    })
                );
            },
            (err: any) => {
                console.log(err);
            }
        );
    };
    searchBusiness(): void {
        this.businessInput
            .pipe(debounceTime(500), distinctUntilChanged())
            .subscribe((searchBusinessName) => {
                console.log(searchBusinessName);
                this.getBusinessDropDownlist(searchBusinessName);
            });
    }

    onSearchBusiness(val): void {
        this.businessInput.next(val.term);
    }

    filterByBusiness(): void {
        this.getInventoryLogsList();
    }

    viewDetails(event) {
        this.viewMoreDetails = event;
        console.log(event);
        this.sideNav.toggle();
    }
}
