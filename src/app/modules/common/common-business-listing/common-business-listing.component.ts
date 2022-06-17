import { Component, OnInit } from '@angular/core';
import { BussinessI } from 'app/core/common/common.interface';
import { CommonService } from 'app/core/common/common.service';

@Component({
    selector: 'app-common-business-listing',
    templateUrl: './common-business-listing.component.html',
    styleUrls: ['./common-business-listing.component.scss'],
})
export class CommonBusinessListingComponent implements OnInit {
    businesses: BussinessI[] = [];
    constructor(private commonService: CommonService) {}

    ngOnInit(): void {}

    getBusinesses(event: string = '') {
        this.commonService.getBusinessListing(event).subscribe((res) => {
            this.businesses = res.data.businesses.results;
        });
    }

    // dismiss(data?: BussinessI) {
    //     this.modalCtrl.dismiss(data);
    // }

    searchEvent(event) {
        const query = event.detail.value;
        this.getBusinesses(query);
    }
}
