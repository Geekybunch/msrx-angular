import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
    ActivatedRoute,
    NavigationStart,
    Router,
    Event,
    NavigationEnd,
} from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { CommonPlantDetailI } from 'app/core/common/common.interface';
import { CommonService } from 'app/core/common/common.service';
import { BusinessTypeEnums } from 'app/shared/shared.enums';
import { cloneDeep } from 'lodash';
import { AddProcessedResultComponent } from '../add-processed-result/add-processed-result.component';
import { AddTestResultComponent } from '../add-test-result/add-test-result.component';

@Component({
    selector: 'app-test-details',
    templateUrl: './test-details.component.html',
    styleUrls: ['./test-details.component.scss'],
})
export class TestDetailsComponent implements OnInit, OnDestroy {
    plantID: string;
    plantResponse: any;
    viewDetails: any;
    showNext = false;
    userInfo: any;
    constructor(
        private activatedRoute: ActivatedRoute,
        private commonService: CommonService,
        private router: Router,
        private matDialog: MatDialog,
        private authService: AuthService
    ) {
        this.commonService.$testPantID.subscribe((res: string) => {
            this.plantID = res;
        });
        this.userInfo = this.authService.userRole;
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe((qParams) => {
            if (qParams.plantID) {
                this.plantID = this.plantID || qParams.plantID;
            }
            this.showNext = qParams.showNext;
            this.getPlantDetails();
        });
    }
    ngOnDestroy(): void {
        this.getPlantDetails();
    }

    getPlantDetails() {
        return this.commonService.getCommonPlantDetails(this.plantID).subscribe(
            (res) => {
                console.log(res);
                this.plantResponse = res.data.plant;
            },
            (err: any) => {
                console.log(err);
            }
        );
    }
    openTestResultDialog(plantData: any) {
        if (this.userInfo.modelId.employer.businessType === 'Tester') {
            let EditPlant = this.matDialog.open(AddTestResultComponent, {
                autoFocus: false,
                data: {
                    plantData: cloneDeep(plantData),
                },
            });
            EditPlant.afterClosed().subscribe((result) => {
                this.getPlantDetails();
            });
        } else if (
            this.userInfo.modelId.employer.businessType === 'Processor'
        ) {
            let EditPlant = this.matDialog.open(AddProcessedResultComponent, {
                autoFocus: false,
                data: {
                    plantData: cloneDeep(plantData),
                },
            });
            EditPlant.afterClosed().subscribe((result) => {
                this.getPlantDetails();
            });
        }
    }
    downloadQrCode() {}
}
