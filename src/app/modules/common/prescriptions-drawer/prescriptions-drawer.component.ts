import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CommonService } from 'app/core/common/common.service';

@Component({
    selector: 'app-prescriptions-drawer',
    templateUrl: './prescriptions-drawer.component.html',
    styleUrls: ['./prescriptions-drawer.component.scss'],
})
export class PrescriptionsDrawerComponent implements OnInit {
    @Output() newItemEvent = new EventEmitter<string>();
    Details: any;
    id: string;
    constructor(private commonService: CommonService) {}

    ngOnInit(): void {
        this.commonService.$passData.subscribe((res: any) => {
            this.Details = res;
            console.log(res);
        });
    }
    closeNav(eve: any) {
        this.newItemEvent.emit(eve);
    }
}
