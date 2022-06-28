import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { CommonService } from 'app/core/common/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import QrScanner from 'qr-scanner';
@Component({
    selector: 'app-qr-scanner-layout',
    templateUrl: './qr-scanner-layout.component.html',
    styleUrls: ['./qr-scanner-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class QrScannerLayoutComponent implements OnInit {
    @ViewChild('videoPlayer') videoplayer: ElementRef<HTMLVideoElement>;
    public userInfo: any;
    // returnDataModal = false;
    // plantID: string;
    // plantResponse: any;
    // data;
    // productResponse: any;
    // plantDetails: boolean = false;
    // productDetails: boolean = false;
    // scannerId: string;
    // filterScannerId: string;
    qrScanner: QrScanner;
    scannedData: string;
    scannedType: string;
    scannedId: string;
    scannerButtonText = 'Start Scanner';
    cameras = [];

    constructor(
        private router: Router,
        private authService: AuthService,
        private commonService: CommonService,
        private spinner: NgxSpinnerService,
        private cd: ChangeDetectorRef
    ) {
        this.userInfo = this.authService.userRole;
    }

    ngOnInit() {}

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
        console.log(result);
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
        }
        console.log('this.scannedId', this.scannedId);
        console.log('this.scannedType', this.scannedType);
        this.cd.detectChanges();
        // check user role
        // check qr type
    }

    // tester can only scan a plant - we display the test form
    // processor can only scan a plant - we display the process form
    // cultivator can only scan a plant - we display the plant details. show popup from right
    // manufacturer can scan plant. - we display him the page where he added products.
    // manufacturer can scan product. - we display the product popup from right side.

    // public getPlantDetails(): void {
    //     this.spinner.show();
    //     this.commonService.getCommonPlantDetails(this.scannerId).subscribe(
    //         (res) => {
    //             this.plantDetails = true;
    //             console.log(res);
    //             this.spinner.hide();
    //             this.plantResponse = res.data.plant;
    //         },
    //         (err: any) => {
    //             console.log(err);
    //         }
    //     );
    // }

    // public getProductDetails(): void {
    //     //  this.spinner.show();
    //     this.commonService.getCommonProductDetails(this.scannerId).subscribe(
    //         (res) => {
    //             this.productResponse = res.data.product;
    //             this.productDetails = true;
    //             // alert('here');
    //             console.log(res);
    //             // this.spinner.hide();
    //         },
    //         (err: any) => {
    //             console.log(err);
    //         }
    //     );
    // }
}
