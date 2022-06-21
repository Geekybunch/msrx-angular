import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
    BussinessI,
    CommonPlantDetailI,
    DispensarySearchI,
    ProductI,
} from 'app/core/common/common.interface';
import { CommonService } from 'app/core/common/common.service';
import { DeliveryVehicleI } from 'app/core/dilevery-vehicle/delivery-vehicle.interface';
import { DileveryVehicleService } from 'app/core/dilevery-vehicle/dilevery-vehicle.service';
import { CreateDileveryI } from 'app/core/distributer/distributer.interface';
import { DistributerService } from 'app/core/distributer/distributer.service';
import moment from 'moment';

@Component({
    selector: 'app-add-distribution',
    templateUrl: './add-distribution.component.html',
    styleUrls: ['./add-distribution.component.scss'],
})
export class AddDistributionComponent implements OnInit {
    @ViewChild('scanQRCodeDialog') scanQRCodeDialog: TemplateRef<any>;
    dileveryForm: FormGroup;
    materials: {
        id: string;
        productDetail: ProductI;
        quantity: number;
    }[] = [];
    deliveryVehicle: DeliveryVehicleI;
    deliveryFrom: BussinessI;
    productID: any;
    quantity: number;
    productData: any;
    quantityDialog: boolean = false;
    businesses: BussinessI[] = [];
    vehicles: DeliveryVehicleI[] = [];
    dispensaries: DispensarySearchI[] = [];
    dispensary: DispensarySearchI;

    constructor(
        private commonService: CommonService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private router: Router,
        private vehicleService: DileveryVehicleService,
        private distributerService: DistributerService
    ) {}
    get materialIDs() {
        return this.materials.map((i) => i.id);
    }

    ngOnInit(): void {
        this.dileveryForm = new FormGroup({
            pickUpLocation: new FormControl(null, Validators.required),
            pickUpDateTime: new FormControl(
                moment().toISOString(),
                Validators.required
            ),
            dropLocation: new FormControl(null, Validators.required),
            dropDateTime: new FormControl(
                moment().toISOString(),
                Validators.required
            ),
            dispensaryCtrl: new FormControl(null, Validators.required),
            vehicle: new FormControl(null, Validators.required),
        });
        this.getDispensaries();
        this.listVehicles();
    }
    showScanMenu() {
        this.dialog.open(this.scanQRCodeDialog);
    }
    productDetails() {
        this.commonService.getCommonProductDetails(this.productID).subscribe(
            (res: any) => {
                console.log(res);
                if (res.data.product === null) {
                    this.snackBar.open('Invalid Product', 'Close', {
                        duration: 3000,
                        panelClass: ['alert-red'],
                    });
                } else {
                    this.productData = res.data?.product;
                    this.quantityDialog = true;
                }
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
    getDispensaries() {
        this.commonService.listDispensaryList().subscribe((res) => {
            this.dispensaries = res.data.dispensaries.results;
            console.log(res);
        });
    }
    listVehicles() {
        this.vehicleService.listVehicles('').subscribe((res) => {
            this.vehicles = res.data.vehicles.results;
        });
    }

    matClose() {
        this.dialog.closeAll();
    }
    addMaterial() {
        this.quantityDialog = false;
        this.materials.push({
            id: this.productData._id,
            productDetail: this.productData,
            quantity: this.quantity,
        });
        if (!this.dileveryForm.get('pickUpLocation').value) {
            this.dileveryForm
                .get('pickUpLocation')
                .setValue(this.productData.manufacturer.businessAddress);
        }
        this.dialog.closeAll();
    }
    openDispensarySearch(dispensary: any) {
        console.log(dispensary);
        if (dispensary) {
            this.dispensary = dispensary;
            this.dileveryForm
                .get('dispensaryCtrl')
                .setValue(this.dispensary.name);
            this.dileveryForm
                .get('dropLocation')
                .setValue(this.dispensary.addressLine1);
        }
    }
    addDelivery() {
        if (this.dileveryForm.invalid) {
            this.snackBar.open('Invalid Form', 'Close', {
                duration: 3000,
                panelClass: ['alert-red'],
            });

            return;
        }

        if (!this.materials.length) {
            this.snackBar.open('Scan atleast one plant!', 'Close', {
                duration: 3000,
                panelClass: ['alert-red'],
            });
            return;
        }

        const request: CreateDileveryI = this.dileveryForm.value;

        request.materials = this.materials.map((m) => ({
            materialId: m.id,
            onModel: 'Product',
            quantity: m.quantity,
        }));
        request.from = this.materials[0].productDetail.manufacturer._id;
        request.to = this.dispensary.business._id;

        this.distributerService.addDelivery(request).subscribe(
            (res: any) => {
                console.log(res);
                this.snackBar.open(res.message, 'Close', {
                    duration: 3000,
                });
                this.router.navigateByUrl('distributor/dashboard');
            },
            (err: any) => {
                console.log(err);
            }
        );
    }
}