import { Component, OnInit } from '@angular/core';
import { DispensaryProfileI } from 'app/core/dispensary/dispensary.interface';
import { DispensaryService } from 'app/core/dispensary/dispensary.service';

@Component({
    selector: 'app-business-profile',
    templateUrl: './business-profile.component.html',
    styleUrls: ['./business-profile.component.scss'],
})
export class BusinessProfileComponent implements OnInit {
    dispensaryData: DispensaryProfileI;
    isOwner = false;
    constructor(private dispensaryService: DispensaryService) {}

    ngOnInit(): void {
        this.getCenterDetails();
    }

    getCenterDetails() {
        this.dispensaryService.getDisposerProfileData().subscribe(
            (res) => {
                this.isOwner = true;
                if (res.data.dispensary) {
                    this.dispensaryData = res.data.dispensary;
                } else {
                    // this.router.navigateByUrl('/dashboard/update-wellness-profile');
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }
}
