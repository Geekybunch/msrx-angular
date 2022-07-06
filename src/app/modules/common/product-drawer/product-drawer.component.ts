import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonService } from 'app/core/common/common.service';
import { QRType } from 'app/shared/shared.enums';
import { genereateQRCode } from 'app/shared/shared.utils';
import { Observable, Observer } from 'rxjs';

@Component({
    selector: 'app-product-drawer',
    templateUrl: './product-drawer.component.html',
    styleUrls: ['./product-drawer.component.scss'],
})
export class ProductDrawerComponent implements OnInit {
    @ViewChild('sidenav') sideNav: MatSidenav;
    productResponse: any = [];
    plantId: string;
    @Output() newItemEvent = new EventEmitter<string>();
    @Input() qrScannerId: string;
    base64Image: any;
    constructor(private commonService: CommonService) {}

    ngOnInit(): void {
        this.getProductDetails();
        this.commonService.$passData.subscribe((res: any) => {
            this.productResponse = res;
            this.qrScannerId = res;
            if (this.qrScannerId) {
                this.getProductDetails();
            }
        });
    }
    public getProductDetails(): void {
        this.commonService.getCommonProductDetails(this.qrScannerId).subscribe(
            (res) => {
                this.productResponse = res.data.product;
                console.log(res);
            },
            (err: any) => {
                console.log(err);
            }
        );
    }
    closeNav(eve: any) {
        this.newItemEvent.emit(eve);
    }
    getPlantsDetails(plants: string) {
        this.commonService
            .getCommonPlantDetails(plants)
            .subscribe((res: any) => {
                console.log(res);
                this.commonService.$testPantID.next(res);
            });

        console.log(plants);
    }
    closeDrawer(event) {
        this.sideNav.close();
    }
    downloadQrCode() {
        const qr = genereateQRCode(QRType.PRODUCT, this.productResponse._id);
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
}
