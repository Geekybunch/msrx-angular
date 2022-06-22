import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { StateAgenciesService } from 'app/core/admin/state-agencies/state-agencies.service';
import { displayedColumns } from './state-agencies.interfaces';
import { StateAgencies } from './state-agencies.interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-state-agencies',
    templateUrl: './state-agencies.component.html',
    styleUrls: ['./state-agencies.component.scss'],
})
export class StateAgenciesComponent implements OnInit {
    @ViewChild('addStateAgencieDialog') addStateAgencieDialog: TemplateRef<any>;
    @ViewChild('passwordChanges') passwordChanges: TemplateRef<any>;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    @ViewChild('sidenav') sideNav: MatSidenav;
    @ViewChild(MatSidenavContainer) sidenavContainer: MatSidenavContainer;
    public pageSize = 10;
    public totalResults: number;
    public stateAgencies;
    visibleColumns = displayedColumns;
    stateAgencieForm: FormGroup;
    resetPasswordForm: FormGroup;
    stateAgencieFromSubmit = false;
    passwordChangeId;
    dataSource = new MatTableDataSource<StateAgencies>();
    constructor(
        private stateAgenciesService: StateAgenciesService,
        private _fuseConfirmationService: FuseConfirmationService,
        private dialog: MatDialog,
        private fb: FormBuilder,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.getStateAgencies();
        this.stateAgencieForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
        });
    }
    get f() {
        return this.stateAgencieForm.controls;
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    getStateAgencies() {
        this.paginator.pageSize = this.paginator.pageSize
            ? this.paginator.pageSize
            : 20;

        let pageparams = `?limit=${this.paginator.pageSize}&page=${
            this.paginator.pageIndex + 1
        }`;
        this.stateAgenciesService
            .getStateAgencies(pageparams)
            .subscribe((res: any) => {
                this.dataSource = res.data.result.results;
                this.totalResults = res.data.result.totalResults;
                this.stateAgencies = res.data.result.results;
            });
    }
    matClose() {
        this.dialog.closeAll();
    }
    deleteStateAgencie(id: number) {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete State Agencie',
            message:
                'Are you sure you want to delete this state Agencie? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });
        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                this.stateAgenciesService.deleteStateAgencies(id).subscribe(
                    (response: any) => {
                        this.getStateAgencies();
                    },
                    (err: any) => {
                        console.log(err);
                    }
                );
            }
        });
    }
    addStateAgencies() {
        this.dialog.open(this.addStateAgencieDialog);
    }
    stateAgencieFormSubmit(formValue) {
        if (this.stateAgencieForm.invalid) {
            this.stateAgencieFromSubmit = true;
            return;
        }

        //console.log('formValue.value', formValue.value, formValue);
        this.stateAgenciesService.postStateAgencies(formValue).subscribe(
            (res) => {
                this.snackBar.open('Successfully Created', 'Close', {
                    duration: 3000,
                });
                this.getStateAgencies();
                this.stateAgencieForm.reset();
                this.dialog.closeAll();
            },
            (err) => {
                this.snackBar.open(err.error.message, 'Close', {
                    duration: 3000,
                    panelClass: ['alert-red'],
                });
                this.dialog.closeAll();
            }
        );
    }

    resetFromSubmition(id) {
        this.passwordChangeId = id;
        //console.log('formValue.value', formValue.value, formValue);
        this.stateAgenciesService
            .resetPasswordStateAgencies(this.passwordChangeId)
            .subscribe(
                (res) => {
                    this.snackBar.open('Password Reset Email Sent', 'Close', {
                        duration: 3000,
                    });
                    this.getStateAgencies();
                    this.stateAgencieForm.reset();
                    this.dialog.closeAll();
                },
                (err) => {
                    this.snackBar.open(err.error.message, 'Close', {
                        duration: 3000,
                        panelClass: ['alert-red'],
                    });
                    this.dialog.closeAll();
                }
            );
    }
}
