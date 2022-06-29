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
    getPlantsDetails(plants: string) {
        this.commonService
            .getCommonPlantDetails(plants)
            .subscribe((res: any) => {
                console.log(res);
                this.commonService.$testPantID.next(res);
            });
        // this.plantId = plants;

        console.log(plants);
    }
    closeDrawer(event) {
        this.sideNav.close();
    }
}
