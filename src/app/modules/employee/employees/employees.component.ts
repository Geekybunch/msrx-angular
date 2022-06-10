import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import {
    DisplayedEmployees,
    EmployeeI,
    EmployeesList,
} from 'app/core/auth/auth.interface';
import { AuthService } from 'app/core/auth/auth.service';
import { EmployeeAdminService } from 'app/core/employee-admin/employee-admin.service';

import { cloneDeep } from 'lodash';
import { Observable } from 'rxjs';
import { CreateEmplyeeComponent } from './create-emplyee/create-emplyee.component';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild('sidenav') sideNav: MatSidenav;
    employee$: Observable<EmployeeI[]>;
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
        private employeService: EmployeeAdminService,
        private authServices: AuthService,
        private _fuseConfirmationService: FuseConfirmationService,
        private matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.getEmployeList();
    }

    getEmployeList(): void {
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

        this.employeService.getEmployeList(totalparams).subscribe(
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
        this.getEmployeList();
    }
    filterByEmployee() {}

    changeStatus(employee: any, status: boolean) {
        if (employee.isApproved === true) {
            status = false;
        } else {
            status = true;
        }

        this.employeService.updateStatus(employee._id, status).subscribe(
            (response: any) => {
                this.getEmployeList();
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
        // confirmation.afterClosed().subscribe((result) => {
        //     if (result === 'confirmed') {
        //         this.employeeService.deleteEmployee(id).subscribe(
        //             (response: any) => {
        //                 this.getEmployeesList();
        //             },
        //             (err: any) => {
        //                 console.log(err);
        //             }
        //         );
        //     }
        // });
    }
    openEmplyeeDialog(employee: EmployeeI) {
        let createEmp = this.matDialog.open(CreateEmplyeeComponent, {
            autoFocus: false,
            data: {
                employeeData: cloneDeep(employee),
            },
        });
        createEmp.afterClosed().subscribe((result) => {
            this.getEmployeList(); // Pizza!
        });
    }
}
