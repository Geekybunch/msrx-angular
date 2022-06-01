import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BusinessService } from 'app/core/admin/business/business.service';
import { Businesses } from './businesses.interfaces';
import { displayedColumns } from './businesses.interfaces';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
    selector: 'app-businesses',
    templateUrl: './businesses.component.html',
    styleUrls: ['./businesses.component.scss'],
})
export class BusinessesComponent implements OnInit {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    public pageSize = 20;
    public totalResults: number;
    public noRecords: any;
    public filterType: string;
    public filterName: string;
    public filterApproved: boolean;
    public statusChange: any;
    public selectedBusiness;
    visibleColumns = displayedColumns;
    dataSource = new MatTableDataSource<Businesses>();

    public businesses: any = [
        'Cultivator',
        'Disposer',
        'Distributor',
        'Dispensary',
        'Manufacturer',
        'Processor',
        'Tester',
        'WellnessCenter',
    ];
    constructor(
        private businessService: BusinessService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        this.getBusinessList();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    getBusinessList() {
        this.paginator.pageSize = this.paginator.pageSize
            ? this.paginator.pageSize
            : 20;

        let pageparams = `?limit=${this.paginator.pageSize}&page=${
            this.paginator.pageIndex + 1
        }`;
        let businessType = this.selectedBusiness
            ? `&businessType=${this.selectedBusiness}`
            : '';
        let businessName = this.filterName
            ? `&businessName=${this.filterName}`
            : '';
        let isApproved = this.filterApproved
            ? `&isApproved=${this.filterApproved}`
            : '';
        let totalparams = `${
            pageparams + businessType + businessName + isApproved
        }`;
        this.businessService.getBusinessDetails(totalparams).subscribe(
            (response: any) => {
                this.noRecords = response.data.businesses.results;
                this.dataSource = response.data.businesses.results;
                this.totalResults = response.data.businesses.totalResults;

                console.log(this.dataSource);
            },
            (err: any) => {
                console.log(err);
            }
        );
    }

    filterByBusiness(): void {
        this.getBusinessList();
    }
    filterByName(query: string): void {
        this.filterName = query;
        this.getBusinessList();
    }
    toggleApproved(change: MatSlideToggleChange): void {
        this.filterApproved = change.checked;
        this.getBusinessList();
    }
    changeStatus(business: any) {
        if (business.isApproved === true) {
            this.statusChange = false;
        } else {
            this.statusChange = true;
        }
        let obj = {
            isApproved: this.statusChange,
        };
        this.businessService.changeBusinessStatus(business._id, obj).subscribe(
            (response: any) => {
                this.getBusinessList();
            },
            (err: any) => {
                console.log(err);
            }
        );
    }
    deleteBusiness(id: number) {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete Business',
            message:
                'Are you sure you want to delete this Business? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });
        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                this.businessService.deleteBusiness(id).subscribe(
                    (response: any) => {
                        this.getBusinessList();
                    },
                    (err: any) => {
                        console.log(err);
                    }
                );
            }
        });
    }
}
