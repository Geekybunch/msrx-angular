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
import { GiveDosageFormComponent } from 'app/modules/dispensary/pages/give-dosage-form/give-dosage-form.component';

import { QRType } from 'app/shared/shared.enums';
import { genereateQRCode, getBusinessType } from 'app/shared/shared.utils';
import { cloneDeep } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
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
    base64data: string = '';

    constructor(
        private activatedRoute: ActivatedRoute,
        private commonService: CommonService,
        private router: Router,
        private snackBar: MatSnackBar,
        private zone: NgZone,
        private authService: AuthService,
        private matDialog: MatDialog,
        private spinner: NgxSpinnerService
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
        this.spinner.show();
        this.commonService
            .getPrescriptionCard(this.prescription.booking._id)
            .then((v: any) => {
                this.spinner.hide();
                const data = v.split('base64,')[1];
                this.base64data = data;
                this.getImage();
                return data;
            });
    }
    public b64toBlob(b64Data, contentType) {
        contentType = contentType || '';
        let sliceSize = 512;
        var byteCharacters = atob(b64Data);
        var byteArrays = [];
        for (
            var offset = 0;
            offset < byteCharacters.length;
            offset += sliceSize
        ) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }
        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }
    getImage() {
        var blob = this.b64toBlob(this.base64data, 'application/pdf');
        let a = document.createElement('a');
        document.body.appendChild(a);
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = String('DIGICARD.pdf');
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    }
}
