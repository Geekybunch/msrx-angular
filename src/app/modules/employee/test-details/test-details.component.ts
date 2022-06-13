import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonPlantDetailI } from 'app/core/common/common.interface';
import { CommonService } from 'app/core/common/common.service';

@Component({
    selector: 'app-test-details',
    templateUrl: './test-details.component.html',
    styleUrls: ['./test-details.component.scss'],
})
export class TestDetailsComponent implements OnInit {
    plantID: string;
    plantResponse: CommonPlantDetailI;
    constructor(
        private activatedRoute: ActivatedRoute,
        private commonService: CommonService
    ) {}

    ngOnInit(): void {
        this.plantID = this.activatedRoute.snapshot.params['id'];
        this.getPlantDetails();

        // this.activatedRoute.queryParams.subscribe((qParams) => {
        //     if (qParams.plantID) {
        //         this.plantID = this.plantID || qParams.plantID;
        //     }
        // });
        // console.log(this.plantID);
    }

    getPlantDetails() {
        return this.commonService
            .getCommonPlantDetails(this.plantID)
            .subscribe((res) => {
                console.log(res);
                this.plantResponse = res.data.plant;
            });
    }
}
