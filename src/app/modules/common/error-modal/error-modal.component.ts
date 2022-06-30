import { Component, OnInit } from '@angular/core';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
    selector: 'app-error-modal',
    templateUrl: './error-modal.component.html',
    styleUrls: ['./error-modal.component.scss'],
})
export class ErrorModalComponent implements OnInit {
    constructor(private confirmationService: FuseConfirmationService) {}

    ngOnInit(): void {
        this.confirmationService.open({
            title: 'Error',
            message: 'Invalid QR Code',
            actions: {
                confirm: {
                    show: false,
                },
                cancel: {
                    show: true,
                    label: 'Cancel',
                },
            },
        });
    }
}
