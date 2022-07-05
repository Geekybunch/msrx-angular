import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CommonService } from 'app/core/common/common.service';
import { PrescriptionI } from 'app/core/wellness/wellness.interface';
import { QRType } from 'app/shared/shared.enums';
import { genereateQRCode } from 'app/shared/shared.utils';
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

    @Input() qrScannerId: string;

    constructor(private commonService: CommonService) {
        this.commonService.$passData.subscribe((res: any) => {
            console.log('res', res);
            this.prescription = res;
            this.bookingID = this.prescription.booking._id;
            this.patientID = this.prescription.booking.patient._id;

            console.log(this.patientID);
        });
        console.log('dffdsfg', this.qrScannerId);
    }

    ngOnInit(): void {
        this.getPrescriptionDetails();
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
        let imageUrl = qr.toDataURL();
        this.getBase64ImageFromURL(imageUrl).subscribe((base64data) => {
            this.base64Image = 'data:image/jpg;base64,' + base64data;
            var link = document.createElement('a');
            document.body.appendChild(link); // for Firefox
            link.setAttribute('href', this.base64Image);
            link.setAttribute('download', 'mmsrx.png');
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
