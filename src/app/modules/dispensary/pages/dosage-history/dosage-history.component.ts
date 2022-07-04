import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CommonService } from 'app/core/common/common.service';
import {
    DispensaryProfileI,
    DosageHistory,
    DosageHistoryResponse,
} from 'app/core/dispensary/dispensary.interface';
import { DispensaryService } from 'app/core/dispensary/dispensary.service';
import { PrescriptionI } from 'app/core/wellness/wellness.interface';

@Component({
    selector: 'app-dosage-history',
    templateUrl: './dosage-history.component.html',
    styleUrls: ['./dosage-history.component.scss'],
})
export class DosageHistoryComponent implements OnInit {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild('sidenav') sideNav: MatSidenav;
    dosages: PrescriptionI[] = [];
    public pageSize = 10;
    public totalResults: number;
    public noRecords: any;
    dataSource = new MatTableDataSource<DispensaryProfileI>();
    visibleColumns = DosageHistory;
    viewDetails;
    public searchedPatient;
    constructor(
        private dispensaryService: DispensaryService,
        private commonService: CommonService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        this.getSoldDosage();
    }
    getSoldDosage() {
        this.paginator.pageSize = this.paginator.pageSize
            ? this.paginator.pageSize
            : 10;
        const pageparams = `?limit=${this.paginator.pageSize}&page=${
            this.paginator.pageIndex + 1
        }`;
        const searchedName = this.searchedPatient
            ? `&name=${this.searchedPatient}`
            : '';
        const totalparams = `${pageparams + searchedName}`;
        this.dispensaryService
            .getSoldDosages(totalparams)
            .subscribe((res: any) => {
                console.log(res);
                this.dataSource = res.data.prescriptions.results;
                this.noRecords = res.data.prescriptions.results;
                this.totalResults = res.data.prescriptions.totalResults;
            });
    }
    filterByPatientsName(query: string): void {
        console.log(query);
        this.searchedPatient = query;
        this.getSoldDosage();
    }
    PrescriptionsDetails(event: any) {
        this.commonService.getPrescription(event._id).subscribe(
            (response: any) => {
                console.log(response);
                this.sideNav.toggle();
                this.commonService.$passData.next(response);
            },
            (error) => {
                this._fuseConfirmationService.open({
                    title: error.error.code,
                    message: error.error.message,
                    actions: {
                        confirm: {
                            show: false,
                            label: 'Confirm',
                            color: 'warn',
                        },
                        cancel: {
                            show: true,
                            label: 'Cancel',
                        },
                    },
                });
            }
        );
        console.log(event);
    }
    closeDrawer(event) {
        this.sideNav.close();
    }
}
