import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeesService } from 'app/core/admin/employees/employees.service';
import { Employees } from './employees.interfaces';
import { displayedColumns } from './employees.interfaces';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
    public pageSize = 10;
    public totalResults: number;
    public filterType: string;
    public filterName: string;
    public filterApproved: boolean;
    public statusChange: any;

    dataSource = new MatTableDataSource<Employees>();
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    constructor(
        private employeesService: EmployeesService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    visibleColumns = displayedColumns;

    ngOnInit(): void {
        this.getemployeesList();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    getemployeesList() {
        this.paginator.pageSize = this.paginator.pageSize
            ? this.paginator.pageSize
            : 20;

        let pageparams = `?limit=${this.paginator.pageSize}&page=${
            this.paginator.pageIndex + 1
        }`;
        let employeeType = this.filterType ? `&type=${this.filterType}` : '';

        let isApproved = this.filterApproved
            ? `&isApproved=${this.filterApproved}`
            : '';
        let totalparams = `${pageparams + employeeType + isApproved}`;
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
    filterBytype(change: MatSelectChange): void {
        this.filterType = change.value;
        this.getemployeesList();
    }
    filterByName(query: string): void {
        this.filterName = query;
        this.getemployeesList();
    }
    toggleApproved(change: MatSlideToggleChange): void {
        this.filterApproved = change.checked;
        this.getemployeesList();
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
                this.getemployeesList();
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
                this.employeesService.deleteEmployee(id).subscribe(
                    (response: any) => {
                        this.getemployeesList();
                    },
                    (err: any) => {
                        console.log(err);
                    }
                );
            }
        });
    }
}
