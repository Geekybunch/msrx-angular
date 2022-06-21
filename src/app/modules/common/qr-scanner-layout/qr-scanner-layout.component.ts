import {
    ChangeDetectionStrategy,
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
    public userInfo: any;
    returnDataModal = false;
    plantID: string;
    plantResponse: any;
    data;
    productResponse: any;
    plantDetails: boolean = false;
    productDetails: boolean = false;
    scannerId: string;
    filterScannerId: string;
    @ViewChild('videoPlayer') videoplayer: ElementRef<HTMLVideoElement>;

    constructor(
        private router: Router,
        private authService: AuthService,
        private commonService: CommonService,
        private spinner: NgxSpinnerService
    ) {
        this.userInfo = this.authService.userRole;
    }

    ngOnInit() {
        const qrScanner = new QrScanner(
            document.getElementById('vid') as HTMLVideoElement,
            (result) => this.setResult(camQrResult, result),

            {
                highlightScanRegion: true,
                highlightCodeOutline: true,
            }
        );
        const camQrResult = document.getElementById('cam-qr-result');
        const camList = document.getElementById('cam-list') as any;
        camList.addEventListener('change', (event: any) => {
            qrScanner.setCamera(event.target.value).then();
        });
        qrScanner.start().then(() => {
            QrScanner.listCameras(true).then((cameras) =>
                cameras.forEach((camera) => {
                    const option = document.createElement('option');
                    option.value = camera.id;
                    option.text = camera.label;
                    camList.add(option);
                })
            );
        });
    }

    setResult(label, result) {
        console.log(result.data);
        label.textContent = result.data;
        this.scannerId = result.data.split(':')[1];
        if (this.scannerId) {
        }
        this.filterScannerId = result.data.split(':')[0];
        if (this.filterScannerId == '0') {
            this.getPlantDetails();
        } else if (this.filterScannerId == '1') {
            this.getProdctDetails();
        }

        // label.style.color = 'teal';
        // clearTimeout(label.highlightTimeout);
        // label.highlightTimeout = setTimeout(
        //     () => (label.style.color = 'inherit'),
        //     100
        // );
    }
    public getPlantDetails(): void {
        this.spinner.show();
        this.commonService.getCommonPlantDetails(this.scannerId).subscribe(
            (res) => {
                this.plantDetails = true;
                console.log(res);
                this.spinner.hide();
                this.plantResponse = res.data.plant;
            },
            (err: any) => {
                console.log(err);
            }
        );
    }
    public getProdctDetails(): void {
        //  this.spinner.show();
        this.commonService.getCommonProductDetails(this.scannerId).subscribe(
            (res) => {
                this.productResponse = res.data.product;
                this.productDetails = true;
                // alert('here');
                console.log(res);
                // this.spinner.hide();
            },
            (err: any) => {
                console.log(err);
            }
        );
    }

    downloadQrCode() {}
}
