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
import { DileveryVehicleService } from 'app/core/dilevery-vehicle/dilevery-vehicle.service';
import { CreateDileveryI } from 'app/core/distributor/distributor.interface';
import { DistributorService } from 'app/core/distributor/distributor.service';
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
    plantID: string;
    quantity: number;
    plantsData: any;
    quantityDialog: boolean = false;
    businesses: BussinessI[] = [];
    vehicles: DeliveryVehicleI[] = [];

    constructor(
        private commonService: CommonService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private router: Router,
        private vehicleService: DileveryVehicleService,
        private distributorService: DistributorService
    ) {}
    get materialIDs() {
        return this.materials.map((i) => i.id);
    }

    ngOnInit(): void {
        this.dileveryForm = new FormGroup({
            vehicle: new FormControl(null, Validators.required),
            fromBusiness: new FormControl(null),
            pickUpLocation: new FormControl(null, Validators.required),
            pickUpDateTime: new FormControl(
                moment().toISOString(),
                Validators.required
            ),
        });
        this.getBusinesses();
        this.listVehicles();
    }
    showScanMenu() {
        this.dialog.open(this.scanQRCodeDialog);
    }
    plantDetails() {
        this.commonService.getCommonPlantDetails(this.plantID).subscribe(
            (res: any) => {
                this.plantID = '';
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
    getBusinesses(event: string = '') {
        this.commonService.getBusinessListing(event).subscribe((res) => {
            this.businesses = res.data.businesses.results;
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
            id: this.plantsData._id,
            plantDetail: this.plantsData,
            quantity: this.quantity,
        });
        this.dialog.closeAll();
    }
    selectBusiness(business: any) {
        console.log(business);
        if (business) {
            this.deliveryFrom = business as BussinessI;
            this.dileveryForm
                .get('fromBusiness')
                .setValue(this.deliveryFrom.businessName);
            this.dileveryForm
                .get('pickUpLocation')
                .setValue(this.deliveryFrom.businessAddress);
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

        request.from = this.deliveryFrom._id;
        delete (request as any).fromBusiness;
        request.to = null;
        this.distributorService.addDelivery(request).subscribe(
            (res: any) => {
                console.log(res);
                this.snackBar.open(res.message, 'Close', {
                    duration: 3000,
                });
                this.router.navigateByUrl('disposer/dashboard');
            },
            (err: any) => {
                console.log(err);
            }
        );
    }
    presentScanAction() {
        this.router.navigateByUrl('/disposer/qr-scanner-layout');
        this.dialog.closeAll();
    }
}
