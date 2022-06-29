import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'app/core/common/common.service';

@Component({
    selector: 'app-plants-drawer',
    templateUrl: './plants-drawer.component.html',
    styleUrls: ['./plants-drawer.component.scss'],
})
export class PlantsDrawerComponent implements OnInit {
    viewDetails: any = [];
    @Output() newItemEvent = new EventEmitter<string>();
    @Input() qrScannerId: string;
    constructor(private commonService: CommonService) {}

    ngOnInit(): void {
        if (this.qrScannerId) {
            this.getPlantDetails();
        }
        this.commonService.$testPantID.subscribe((res: any) => {
            this.viewDetails = res.data.plant;
        });
    }
    getPlantDetails() {
        return this.commonService
            .getCommonPlantDetails(this.qrScannerId)
            .subscribe(
                (res: any) => {
                    this.viewDetails = res.data.plant;
                },
                (err: any) => {
                    console.log(err);
                }
            );
    }
    closeNav(eve: any) {
        this.newItemEvent.emit(eve);
    }
}
