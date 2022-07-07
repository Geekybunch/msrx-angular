import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WellnessCenterI } from 'app/core/wellness/wellness.interface';
import { WellnessService } from 'app/core/wellness/wellness.service';

@Component({
    selector: 'app-wellness-center-details',
    templateUrl: './wellness-center-details.component.html',
    styleUrls: ['./wellness-center-details.component.scss'],
})
export class WellnessCenterDetailsComponent implements OnInit {
    wellnessData: WellnessCenterI;
    isOwner = false;
    constructor(
        private wellnessCenterService: WellnessService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getCenterDetails();
    }
    getCenterDetails() {
        this.wellnessCenterService
            .getWellnessCenterProfile()
            .subscribe((res) => {
                if (res.data.wellnessCenter) {
                    this.wellnessData = res.data.wellnessCenter;
                } else {
                    this.router.navigateByUrl(
                        '/wellnesscenter/update-wellness-profile'
                    );
                }
                this.isOwner = true;
            });
    }
}
