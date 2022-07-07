import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CommonService } from 'app/core/common/common.service';
import { PrescriptionI } from 'app/core/wellness/wellness.interface';
import { QRType } from 'app/shared/shared.enums';
import { genereateQRCode } from 'app/shared/shared.utils';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Observer } from 'rxjs';

@Component({
    selector: 'app-prescriptions-drawer',
    templateUrl: './prescriptions-drawer.component.html',
    styleUrls: ['./prescriptions-drawer.component.scss'],
})
export class PrescriptionsDrawerComponent implements OnInit {
    @Output() newItemEvent = new EventEmitter<string>();
    prescription: any;
    base64Image: any;
    bookingID: string;
    patientID: string;
    prescriptionNull: any;
    base64data: string = '';
    @Input() qrScannerId: string;

    constructor(
        private commonService: CommonService,
        private spinner: NgxSpinnerService
    ) {
        this.commonService.$passData.subscribe((res: any) => {
            console.log('res', res);
            this.prescription = res;
            this.bookingID = this.prescription.booking._id;
            this.patientID = this.prescription.booking.patient._id;
            console.log(this.patientID);
        });
    }

    ngOnInit(): void {
        if (this.qrScannerId) {
            this.getPrescriptionDetails();
        }
    }

    public getPrescriptionDetails() {
        return this.commonService
            .getValidPrescription(this.qrScannerId)
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
                    console.log(err);
                }
            );
    }

    closeNav(eve: any) {
        this.newItemEvent.emit(eve);
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
