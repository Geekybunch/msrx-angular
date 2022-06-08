import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { EmployeesService } from 'app/core/employee/employees/employees.service';
import {
    EmployeesList,
    DisplayedEmployees,
} from 'app/core/employee/employees/employess.interface';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild('sidenav') sideNav: MatSidenav;
    public pageSize = 10;
    public totalResults: number;
    public noRecords: any;
    public viewDetails: any;
    public filterbatchNumber: string;
    public geneticStainTypes: any;
    public selectedEmployee;
    public statusChange: any;
    dataSource = new MatTableDataSource<EmployeesList>();

    visibleColumns = DisplayedEmployees;
    public Employees: any = ['Admin', 'Employee'];
    constructor(
        private employeeService: EmployeesService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        this.getEmployeesList();
    }
    getEmployeesList(): void {
        this.paginator.pageSize = this.paginator.pageSize
            ? this.paginator.pageSize
            : 20;

        const pageparams = `?limit=${this.paginator.pageSize}&page=${
            this.paginator.pageIndex + 1
        }`;
        const batchNumber = this.filterbatchNumber
            ? `&batchNumber=${this.filterbatchNumber}`
            : '';
        const totalparams = `${pageparams + batchNumber}`;

        this.employeeService.getemployeesDetails(totalparams).subscribe(
            (response: any) => {
                console.log(response);
                this.noRecords = response.data.employees.results;
                this.dataSource = response.data.employees.results;
                this.totalResults = response.data.employees.totalResults;
            },
            (err: any) => {
                console.log(err);
            }
        );
    }
    // getPhase(phase: GrowerPlant) {
    //     return Object.keys(phase.phase)[0];
    // }
    toggleApproved(event: any) {}
    sideToggle(event): void {
        this.viewDetails = event;
        console.log(event);
        this.sideNav.toggle();
    }

    filterByBatchNumber(query: string): void {
        this.filterbatchNumber = query;
        this.getEmployeesList();
    }
    filterByEmployee() {}

    changeStatus(business: any) {
        if (business.isApproved === true) {
            this.statusChange = false;
        } else {
            this.statusChange = true;
        }
        let obj = {
            isApproved: this.statusChange,
        };
        this.employeeService.changeEmployeeStatus(business._id, obj).subscribe(
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
                this.employeeService.deleteEmployee(id).subscribe(
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
