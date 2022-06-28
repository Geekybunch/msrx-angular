import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from 'app/core/common/common.service';

@Component({
    selector: 'app-product-drawer',
    templateUrl: './product-drawer.component.html',
    styleUrls: ['./product-drawer.component.scss'],
})
export class ProductDrawerComponent implements OnInit {
    productResponse: any = [];
    @Output() newItemEvent = new EventEmitter<string>();
    @Input() qrScannerId: string;
    constructor(private commonService: CommonService) {}

    ngOnInit(): void {
        this.getProductDetails();
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
}
