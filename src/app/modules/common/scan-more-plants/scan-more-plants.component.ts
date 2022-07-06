import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    NgZone,
    OnInit,
    ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import QrScanner from 'qr-scanner';
import { ErrorModalComponent } from '../error-modal/error-modal.component';

@Component({
    selector: 'app-scan-more-plants',
    templateUrl: './scan-more-plants.component.html',
    styleUrls: ['./scan-more-plants.component.scss'],
})
export class ScanMorePlantsComponent implements OnInit {
    @ViewChild('videoPlayer') videoplayer: ElementRef<HTMLVideoElement>;
    enterdPlantId;
    qrScanner: QrScanner;
    scannedData: string;
    scannedType: string;
    scannedId: string;
    scannerButtonText = 'Start Scanner';
    addButton: boolean = false;
    cameras = [];
    constructor(
        private cd: ChangeDetectorRef,
        private zone: NgZone,
        private dialog: MatDialog,
        private confirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {}
    setCameras() {
        this.qrScanner.start().then(() => {
            QrScanner.listCameras(true).then((cameras: QrScanner.Camera[]) =>
                cameras.forEach((camera) => {
                    this.cameras.push({
                        value: camera.id,
                        text: camera.label,
                    });
                })
            );
        });
    }

    async startScanner() {
        try {
            this.qrScanner = new QrScanner(
                document.getElementById('vid') as HTMLVideoElement,
                (result: any) => {
                    if (result) {
                        this.setResult(result);
                    }
                }
            );
            this.setCameras();
            await this.qrScanner.start();
        } catch (error) {
            console.log('scanner not available ' + error);
            alert('scanner not available ' + error);
        }
    }

    async stopScanner() {
        try {
            await this.qrScanner.stop();
        } catch (error) {
            console.log('unable to stop scanner');
        }
    }

    async setResult(result) {
        await this.stopScanner();
        this.scannerButtonText = 'Scan Again';
        this.scannedData = result;

        const type = this.scannedData.split(':')[0];
        this.scannedId = this.scannedData.split(':')[1];
        if (!type || !this.scannedId) {
            alert('Invalid QR Code');
            return;
        }
        if (type === '0') {
            this.scannedType = 'Plant';
        }
        if (type === '1') {
            this.scannedType = 'Product';
            // this.zone.run(() => {
            //     this.confirmationService.open({
            //         title: 'Error',
            //         message: 'Invalid QR Code',
            //         actions: {
            //             confirm: {
            //                 show: false,
            //             },
            //             cancel: {
            //                 show: true,
            //                 label: 'Cancel',
            //             },
            //         },
            //     });
            // });
            // this.scannedId = '';
        }
        console.log('this.scannedId', this.scannedId);
        console.log('this.scannedType', this.scannedType);
        this.cd.detectChanges();
        this.zone.run(() => {
            this.addButton = true;
        });
    }
}
