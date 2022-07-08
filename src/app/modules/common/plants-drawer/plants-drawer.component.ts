import {
    Component,
    EventEmitter,
    Input,
    NgZone,
    OnInit,
    Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'app/core/common/common.service';
import { QRType } from 'app/shared/shared.enums';
import { genereateQRCode } from 'app/shared/shared.utils';
import { Observable, Observer } from 'rxjs';

@Component({
    selector: 'app-plants-drawer',
    templateUrl: './plants-drawer.component.html',
    styleUrls: ['./plants-drawer.component.scss'],
})
export class PlantsDrawerComponent implements OnInit {
    viewDetails: any = [];
    @Output() newItemEvent = new EventEmitter<string>();
    @Input() qrScannerId: string;
    base64Image: any;
    constructor(private commonService: CommonService, private zone: NgZone) {}

    ngOnInit(): void {
        if (this.qrScannerId) {
            this.getPlantDetails();
        }
        this.commonService.$testPantID.subscribe((res: any) => {
            this.viewDetails = res.data.plant;
        });
        this.commonService.$passData.subscribe((res: any) => {
            this.qrScannerId = res;
            if (this.qrScannerId) {
                this.getPlantDetails();
            }
            this.viewDetails = res;
        });
    }
    getPlantDetails() {
        return this.commonService
            .getCommonPlantDetails(this.qrScannerId)
            .subscribe(
                (res: any) => {
                    this.viewDetails = res.data.plant;
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
        const qr = genereateQRCode(QRType.PLANT, this.viewDetails._id);
        qr.toDataURL();
        const imageUrl = qr.toDataURL();
        this.getBase64ImageFromURL(imageUrl).subscribe((base64data) => {
            this.base64Image = 'data:image/jpg;base64,' + base64data;
            const link = document.createElement('a');
            document.body.appendChild(link); // for Firefox
            link.setAttribute('href', this.base64Image);
            link.setAttribute('download', `plant_${this.viewDetails._id}.png`);
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
