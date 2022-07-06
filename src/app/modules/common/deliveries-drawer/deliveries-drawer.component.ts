import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonService } from 'app/core/common/common.service';

@Component({
    selector: 'app-deliveries-drawer',
    templateUrl: './deliveries-drawer.component.html',
    styleUrls: ['./deliveries-drawer.component.scss'],
})
export class DeliveriesDrawerComponent implements OnInit {
    deliveryDetails: any;
    @Output() newItemEvent = new EventEmitter<string>();

    constructor(private commonService: CommonService) {}

    ngOnInit(): void {
        this.commonService.$passData.subscribe((res: any) => {
            this.deliveryDetails = res;
        });
        console.log(this.deliveryDetails);
    }
    closeNav(eve: any) {
        this.newItemEvent.emit(eve);
    }
}
