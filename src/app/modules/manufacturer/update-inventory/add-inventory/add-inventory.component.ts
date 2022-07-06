import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ProductI } from 'app/core/common/common.interface';
import { CommonService } from 'app/core/common/common.service';
import { InventoryService } from 'app/core/inventory/inventory.service';
import { ScanMorePlantsComponent } from 'app/modules/common/scan-more-plants/scan-more-plants.component';

@Component({
    selector: 'app-add-inventory',
    templateUrl: './add-inventory.component.html',
    styleUrls: ['./add-inventory.component.scss'],
})
export class AddInventoryComponent implements OnInit {
    @ViewChild('scanQRCodeDialog') scanQRCodeDialog: TemplateRef<any>;
    scannedProductIDs: {
        productID: string;
        quantity: number;
        product: ProductI;
    }[] = [];

    productID;
    quantityDialog: boolean = false;
    productData: any;
    quantity: number;
    constructor(
        private dialog: MatDialog,
        private commonService: CommonService,
        private snackBar: MatSnackBar,
        private inventoryService: InventoryService,
        private _fuseConfirmationService: FuseConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {}

    productDetails() {
        this.commonService.getCommonProductDetails(this.productID).subscribe(
            (res: any) => {
                this.productID = '';

                if (!res.data.product) {
                    this.snackBar.open('Invalid Product', 'Close', {
                        duration: 3000,
                        panelClass: ['alert-red'],
                    });
                } else {
                    this.productData = res.data.product;
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
    showScanMenu() {
        this.dialog.open(this.scanQRCodeDialog);
    }
    matClose() {
        this.dialog.closeAll();
    }
    presentScanAction(): void {
        const dialogRef = this.dialog.open(ScanMorePlantsComponent, {});
        dialogRef.afterClosed().subscribe((result) => {
            this.productID = result;
            // this.addPlant();
            console.log(result);
        });
    }
    addMaterial() {
        this.quantityDialog = false;
        const qty = this.quantity;
        if (qty) {
            this.scannedProductIDs.push({
                productID: this.productData._id,
                product: this.productData,
                quantity: this.quantity,
            });
        }
        console.log(this.scannedProductIDs);
        this.dialog.closeAll();
    }
    addItemToInventory() {
        if (this.scannedProductIDs.length === 0) {
            this._fuseConfirmationService.open({
                title: 'Error',
                message: 'Products  details not found...!',
                actions: {
                    confirm: {
                        show: false,
                    },
                    cancel: {
                        show: true,
                        label: 'Cancel',
                    },
                },
            });
            return;
        }
        this.inventoryService
            .addQuantity({
                quantity: this.quantity,
                materialId: this.productData._id,
            })
            .subscribe(
                (res) => {
                    console.log(res);
                    this.snackBar.open('Inventory Added', 'Close', {
                        duration: 4000,
                    });
                    this.router.navigate(['/manufacturer/update-inventory']);
                },
                (err) => {
                    console.log(err);
                }
            );
    }
}
