import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    NgZone,
    OnInit,
    ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import QrScanner from 'qr-scanner';
@Component({
    selector: 'app-qr-scanner-layout',
    templateUrl: './qr-scanner-layout.component.html',
    styleUrls: ['./qr-scanner-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class QrScannerLayoutComponent implements OnInit {
    @ViewChild('videoPlayer') videoplayer: ElementRef<HTMLVideoElement>;
    @ViewChild('sidenav') sideNav: MatSidenav;
    public userRole: any;
    public qrScannerId: string;
    plantDetails: boolean = false;
    productDetails: boolean = false;
    prescriptionDetails: boolean = false;
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
        private cd: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private zone: NgZone
    ) {
        this.userRole = this.authService.userRole;
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
        if (type === '3') {
            this.scannedType = 'Patient';
        }
        this.zone.run(() => {
            this.getTestresults();
        });

        console.log('this.scannedId', this.scannedId);
        console.log('this.scannedType', this.scannedType);
        this.cd.detectChanges();
    }

    getTestresults() {
        if (this.userRole.modelId.employer?.businessType === 'Tester') {
            if (this.scannedType === 'Plant') {
                this.router.navigate(['/tester/test-details'], {
                    queryParams: {
                        plantID: this.scannedId,
                    },
                    replaceUrl: true,
                });
            } else {
                this._fuseConfirmationService.open({
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
        } else if (
            this.userRole.modelId.employer?.businessType === 'Processor'
        ) {
            if (this.scannedType === 'Plant') {
                this.router.navigate(['/processor/test-details'], {
                    queryParams: {
                        plantID: this.scannedId,
                    },
                    replaceUrl: true,
                });
            } else {
                this._fuseConfirmationService.open({
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
        } else if (
            this.userRole.modelId.employer?.businessType === 'Cultivator'
        ) {
            if (this.scannedType === 'Plant') {
                this.plantDetails = true;
                this.sideNav.toggle();
                this.qrScannerId = this.scannedId;
            } else {
                this._fuseConfirmationService.open({
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
        } else if (
            this.userRole.modelId.employer?.businessType === 'Manufacturer'
        ) {
            if (this.scannedType === 'Plant') {
                this.router.navigate(['/manufacturer/add-manufactured-good'], {
                    queryParams: {
                        plantID: this.scannedId,
                    },

                    replaceUrl: true,
                });
            } else {
                this.sideNav.toggle();
                this.qrScannerId = this.scannedId;
                this.productDetails = true;
            }
        } else if (
            this.userRole.modelId.employer?.businessType === 'Disposer'
        ) {
            if (this.scannedType === 'Plant') {
                this.router.navigate(['/disposer/test-details'], {
                    queryParams: {
                        plantID: this.scannedId,
                    },
                    replaceUrl: true,
                });
            } else {
                this._fuseConfirmationService.open({
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
        } else if (
            this.userRole.modelId.employer?.businessType === 'Distributor'
        ) {
            if (this.scannedType === 'Plant') {
                this.plantDetails = true;
                this.sideNav.toggle();
                this.qrScannerId = this.scannedId;
            } else {
                this.sideNav.toggle();
                this.qrScannerId = this.scannedId;
                this.productDetails = true;
            }
        } else if (
            this.userRole.modelId.employer?.businessType === 'WellnessCenter'
        ) {
            if (this.scannedType === 'Product') {
                this.productDetails = true;
                this.sideNav.toggle();
                this.qrScannerId = this.scannedId;
            } else if (this.scannedType === 'Patient') {
                this.prescriptionDetails = true;
                this.sideNav.toggle();
                this.qrScannerId = this.scannedId;
            } else {
                this._fuseConfirmationService.open({
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
        } else if (
            this.userRole.modelId.employer?.businessType === 'Dispensary'
        ) {
            if (this.scannedType == 'Product') {
                this.productDetails = true;
                this.sideNav.toggle();
                this.qrScannerId = this.scannedId;
            } else if (this.scannedType == 'Patient') {
                this.prescriptionDetails = true;
                this.sideNav.toggle();
                this.qrScannerId = this.scannedId;
            } else {
                this._fuseConfirmationService.open({
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
    }

    closeDrawer(event) {
        this.sideNav.close();
    }

    // tester can only scan a plant - we display the test form
    // processor can only scan a plant - we display the process form
    // cultivator can only scan a plant - we display the plant details. show popup from right
    // manufacturer can scan plant. - we display him the page where he added products.
    // manufacturer can scan product. - we display the product popup from right side.
}
