import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    NgZone,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { CommonPlantDetailI } from 'app/core/common/common.interface';
import { CommonService } from 'app/core/common/common.service';
import { QRType } from 'app/shared/shared.enums';
import { downloadFile, genereateQRCode } from 'app/shared/shared.utils';
import { cloneDeep } from 'lodash';
import { AddProcessedResultComponent } from '../add-processed-result/add-processed-result.component';
import { AddTestResultComponent } from '../add-test-result/add-test-result.component';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Observer } from 'rxjs';

@Component({
    selector: 'app-test-details',
    templateUrl: './test-details.component.html',
    styleUrls: ['./test-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class TestDetailsComponent implements OnInit, OnDestroy {
    plantID: string;
    plantResponse: any;
    viewDetails: any;

    userInfo: any;
    plantNull: any;
    testButton: boolean = false;
    qrfileName: any;
    base64Image: any;
    constructor(
        private activatedRoute: ActivatedRoute,
        private commonService: CommonService,
        private router: Router,
        private matDialog: MatDialog,
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private cdRef: ChangeDetectorRef,
        private zone: NgZone
    ) {
        this.commonService.$testPantID.subscribe((res: string) => {
            this.plantID = res;
        });
        this.userInfo = this.authService.userRole;
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe((qParams) => {
            if (qParams.plantID) {
                this.plantID = this.plantID || qParams.plantID;
            }
            this.zone.run(() => {
                this.getPlantDetails();
            });
            console.log(this.plantID);
        });
    }
    ngOnDestroy(): void {
        this.getPlantDetails();
    }

    getPlantDetails() {
        return this.commonService.getCommonPlantDetails(this.plantID).subscribe(
            (res) => {
                this.plantResponse = res.data.plant;
                if (this.plantResponse == null) {
                    this.plantNull = '  "PlantId" incorrect...!';
                }
            },
            (err: any) => {
                this.router.navigate(['/'], {
                    replaceUrl: true,
                });
                this.snackBar.open(err.error.message, 'Close', {
                    duration: 3000,
                    panelClass: ['alert-red'],
                });
                console.log(err);
            }
        );
    }

    openTestResultDialog(plantData: any) {
        if (this.userInfo.modelId.employer.businessType === 'Tester') {
            const editPlant = this.matDialog.open(AddTestResultComponent, {
                autoFocus: false,
                data: {
                    plantData: cloneDeep(plantData),
                },
            });
            editPlant.afterClosed().subscribe((result) => {
                this.getPlantDetails();
            });
        } else if (
            this.userInfo.modelId.employer.businessType === 'Processor'
        ) {
            const editPlant = this.matDialog.open(AddProcessedResultComponent, {
                autoFocus: false,
                data: {
                    plantData: cloneDeep(plantData),
                },
            });
            editPlant.afterClosed().subscribe((result) => {
                this.getPlantDetails();
            });
        }
    }
    downloadQrCode() {
        const qr = genereateQRCode(QRType.PLANT, this.plantID);
        qr.toDataURL();
        const imageUrl = qr.toDataURL();
        this.getBase64ImageFromURL(imageUrl).subscribe((base64data) => {
            this.base64Image = 'data:image/jpg;base64,' + base64data;
            const link = document.createElement('a');
            document.body.appendChild(link); // for Firefox
            link.setAttribute('href', this.base64Image);
            link.setAttribute('download', `plant_${this.plantID}.png`);
            link.click();
        });
    }

    getBase64ImageFromURL(url: string) {
        return Observable.create((observer: Observer<string>) => {
            const img: HTMLImageElement = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = url;
            if (!img.complete) {
                img.onload = () => {
                    observer.next(this.getBase64Image(img));
                    observer.complete();
                };
                img.onerror = (err) => {
                    observer.error(err);
                };
            } else {
                observer.next(this.getBase64Image(img));
                observer.complete();
            }
        });
    }

    getBase64Image(img: HTMLImageElement) {
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataURL: string = canvas.toDataURL('image/png');
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
    }
}
