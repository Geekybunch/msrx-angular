import {
    ChangeDetectorRef,
    Component,
    Input,
    NgZone,
    OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { CommonService } from 'app/core/common/common.service';
import { InventoryService } from 'app/core/inventory/inventory.service';
import { PrescriptionI } from 'app/core/wellness/wellness.interface';
import { AddProcessedResultComponent } from 'app/modules/employee/add-processed-result/add-processed-result.component';
import { AddTestResultComponent } from 'app/modules/employee/add-test-result/add-test-result.component';
import { BusinessTypeEnums, QRType } from 'app/shared/shared.enums';
import { genereateQRCode, getBusinessType } from 'app/shared/shared.utils';
import { cloneDeep } from 'lodash';
import { Observable, Observer } from 'rxjs';

@Component({
    selector: 'app-prescription-details',
    templateUrl: './prescription-details.component.html',
    styleUrls: ['./prescription-details.component.scss'],
})
export class PrescriptionDetailsComponent implements OnInit {
    patientID: string;
    prescription: any;
    prescriptionNull: any;
    base64Image: any;
    giveDosage: boolean = false;
    role;

    constructor(
        private activatedRoute: ActivatedRoute,
        private commonService: CommonService,
        private router: Router,
        private snackBar: MatSnackBar,
        private zone: NgZone,
        private authService: AuthService
    ) {
        this.role = this.authService.userRole;
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe((qParams) => {
            console.log(qParams.patientID);
            if (qParams.patientID) {
                this.patientID = qParams.patientID;
            }
            this.zone.run(() => {
                this.getPrescriptionDetails();
            });
            console.log(this.patientID);
        });
        if (this.role.modelId.employer.businessType === 'Dispensary') {
            this.giveDosage = true;
        }
    }
    ngOnDestroy(): void {
        this.getPrescriptionDetails();
    }

    getPrescriptionDetails() {
        return this.commonService
            .getValidPrescription(this.patientID)
            .subscribe(
                (res) => {
                    this.prescription = res.data.prescription;
                    console.log(this.prescription);
                    if (!this.prescription) {
                        this.prescriptionNull =
                            '  "Prescription" not found...!';
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

    giveDosageForm() {}
    downloadQrCode() {
        const qr = genereateQRCode(QRType.PATIENT, this.patientID);
        qr.toDataURL();
        const imageUrl = qr.toDataURL();
        this.getBase64ImageFromURL(imageUrl).subscribe((base64data) => {
            this.base64Image = 'data:image/jpg;base64,' + base64data;
            const link = document.createElement('a');
            document.body.appendChild(link); // for Firefox
            link.setAttribute('href', this.base64Image);
            link.setAttribute('download', `prescription_${this.patientID}.png`);
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

    downloadDIGICard() {
        this.commonService
            .getPrescriptionCard(this.prescription.booking._id)
            .then((v) => {
                console.log(v);
                // this.downloadPdf(v as string);
            });
    }
}
