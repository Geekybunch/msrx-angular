import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
    ActivatedRoute,
    NavigationStart,
    Router,
    Event,
    NavigationEnd,
} from '@angular/router';
import { CommonPlantDetailI } from 'app/core/common/common.interface';
import { CommonService } from 'app/core/common/common.service';
import { cloneDeep } from 'lodash';
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
    constructor(
        private activatedRoute: ActivatedRoute,
        private commonService: CommonService,
        private router: Router,
        private matDialog: MatDialog
    ) {
        this.commonService.$testPantID.subscribe((res: string) => {
            this.plantID = res;
        });
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
        let EditPlant = this.matDialog.open(AddTestResultComponent, {
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
