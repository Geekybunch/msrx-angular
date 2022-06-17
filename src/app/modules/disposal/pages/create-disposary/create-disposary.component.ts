import {
    Component,
    Inject,
    OnInit,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
    BussinessI,
    CommonPlantDetailI,
} from 'app/core/common/common.interface';
import { CommonService } from 'app/core/common/common.service';
import { DeliveryVehicleI } from 'app/core/dilevery-vehicle/delivery-vehicle.interface';
import moment from 'moment';

@Component({
    selector: 'app-create-disposary',
    templateUrl: './create-disposary.component.html',
    styleUrls: ['./create-disposary.component.scss'],
})
export class CreateDisposaryComponent implements OnInit {
    @ViewChild('scanQRCodeDialog') scanQRCodeDialog: TemplateRef<any>;
    dileveryForm: FormGroup;
    materials: {
        id: string;
        plantDetail: CommonPlantDetailI;
        quantity: number;
    }[] = [];
    deliveryVehicle: DeliveryVehicleI;
    deliveryFrom: BussinessI;
    plantID: any;
    quantity: number;
    plantsData: any;
    quantityDialog: boolean = false;
    businesses: BussinessI[] = [];

    constructor(
        private commonService: CommonService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private router: Router
    ) {}
    get materialIDs() {
        return this.materials.map((i) => i.id);
    }

    ngOnInit(): void {
        this.dileveryForm = new FormGroup({
            vehicleCtrl: new FormControl(null, Validators.required),
            fromBusiness: new FormControl(null),
            pickUpLocation: new FormControl(null, Validators.required),

            pickUpDateTime: new FormControl(
                moment().toISOString(),
                Validators.required
            ),
        });
    }
    ngOnChanges() {
        this.plantDetails();
    }
    addDelivery() {}
    showScanMenu() {
        this.dialog.open(this.scanQRCodeDialog);
    }
    plantDetails() {
        this.commonService.getCommonPlantDetails(this.plantID).subscribe(
            (res: any) => {
                console.log(res);
                this.plantsData = res.data?.plant;
                this.quantityDialog = true;
            },
            (err: any) => {
                this.snackBar.open(err.error.message, 'Close', {
                    duration: 3000,
                    panelClass: ['alert-red'],
                });
                console.log(err);
            }
        );
    }
    openBusinessSearch() {
        this.getPlantDetails();
    }
    getPlantDetails(event: string = '') {
        this.commonService.getCommonPlantDetails(event).subscribe((res) => {
            console.log(res);
            // this.businesses = res.data.businesses.results;
        });
    }

    matClose() {
        this.dialog.closeAll();
    }
    addMaterial() {
        this.materials.push({
            id: this.plantsData._id,
            plantDetail: this.plantsData,
            quantity: this.quantity,
        });
        this.dialog.closeAll();
    }
}
