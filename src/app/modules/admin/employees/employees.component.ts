import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeesService } from 'app/core/admin/employees/employees.service';
import { Employees } from './employees.interfaces';
import { displayedColumns } from './employees.interfaces';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { BusinessService } from 'app/core/admin/business/business.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    public pageSize = 10;
    public totalResults: number;
    public filterType: string;
    public filterEmployeeName: string;
    public filterApproved: boolean;
    public statusChange: any;
    public selectedEmployee;
    public businesses: string[] = [];
    public businessInput = new Subject<string>();
    public selectedBusiness;
    dataSource = new MatTableDataSource<Employees>();
    public Employees: any = ['Admin', 'Employee'];
    constructor(
        private employeesService: EmployeesService,
        private _fuseConfirmationService: FuseConfirmationService,
        private businessService: BusinessService
    ) {}

    visibleColumns = displayedColumns;

    ngOnInit(): void {
        this.getEmployeesList();
        this.getBusinessDropDownlist();
        this.searchBusiness();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    getEmployeesList() {
        this.paginator.pageSize = this.paginator.pageSize
            ? this.paginator.pageSize
            : 20;

        let pageparams = `?limit=${this.paginator.pageSize}&page=${
            this.paginator.pageIndex + 1
        }`;
        let employeeType = this.selectedEmployee
            ? `&type=${this.selectedEmployee}`
            : '';
        let employer = this.selectedBusiness
            ? `&employer=${this.selectedBusiness}`
            : '';
        let isApproved = this.filterApproved
            ? `&isApproved=${this.filterApproved}`
            : '';
        let totalparams = `${
            pageparams + employeeType + isApproved + employer
        }`;
        this.employeesService.getemployeesDetails(totalparams).subscribe(
            (response: any) => {
                this.dataSource = response.data.result.results;
                this.totalResults = response.data.result.totalResults;
                console.log(response.data.result.results);
            },
            (err: any) => {
                console.log(err);
            }
        );
    }
    getBusinessDropDownlist = (businessName?: string): void => {
        console.log('get businesses');
        let pageParams = '?limit=5&page=1&businessType=Cultivator';
        if (businessName) {
            pageParams += '&businessName=' + businessName;
        }
        this.businessService.getBusinessDetails(pageParams).subscribe(
            (response: any) => {
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
    filterByBusiness() {
        this.getEmployeesList();
    }
    filterByEmployee(): void {
        this.getEmployeesList();
    }
    filterByEmployeeName(query: string): void {
        this.filterEmployeeName = query;
        this.getEmployeesList();
    }
    toggleApproved(change: MatSlideToggleChange): void {
        this.filterApproved = change.checked;
        this.getEmployeesList();
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
        this.employeesService.changeEmployeeStatus(business._id, obj).subscribe(
            (response: any) => {
                this.getEmployeesList();
            },
            (err: any) => {
                console.log(err);
            }
        );
    }
    deleteBusiness(id: number) {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete employee',
            message:
                'Are you sure you want to delete this employee? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });
        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                this.employeesService.deleteEmployee(id).subscribe(
                    (response: any) => {
                        this.getEmployeesList();
                    },
                    (err: any) => {
                        console.log(err);
                    }
                );
            }
        });
    }
}
