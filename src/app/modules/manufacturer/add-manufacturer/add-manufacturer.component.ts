import {
    Component,
    Inject,
    OnInit,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'app/core/common/common.service';
import { ManufactureService } from 'app/core/manufacture/manufacture.service';
import {
    CreateProductsRequest,
    MaufacturedProductI,
} from 'app/core/manufacture/maufacturor.interface';
import { ScanMorePlantsComponent } from 'app/modules/common/scan-more-plants/scan-more-plants.component';
export interface Fruit {
    name: string;
}

@Component({
    selector: 'app-add-manufacturer',
    templateUrl: './add-manufacturer.component.html',
    styleUrls: ['./add-manufacturer.component.scss'],
})
export class AddManufacturerComponent implements OnInit {
    @ViewChild('scanQRCodeDialog')
    scanQRCodeDialog: TemplateRef<AddManufacturerComponent>;
    @ViewChild('sidenav') sideNav: MatSidenav;
    createProductForm: FormGroup;
    ingredients: string[] = [];
    allergies: string[] = [];
    plantIDs: string[] = [];
    public enterdPlantId: string;
    isModify = false;
    public editProduct: any = [];
    public editProductId: string;
    addOnBlur = true;

    constructor(
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private manufactureService: ManufactureService,
        private commonService: CommonService,
        private activatedRouter: ActivatedRoute,
        private router: Router,
        @Inject(MAT_DIALOG_DATA) private data: { productData: any },
        private _matDialogRef: MatDialogRef<AddManufacturerComponent>
    ) {}

    ngOnInit(): void {
        this.createProductForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.required),
            sku: new FormControl(null, Validators.required),
            ingredient: new FormControl(null),
            dosage: new FormControl(null, Validators.required),
            allergy: new FormControl(null),
        });
        this.activatedRouter.queryParams.subscribe((qParams) => {
            if (qParams.plantID) {
                this.plantIDs = [qParams.plantID];
            }
        });
        this.activatedRouter.queryParams.subscribe((qParams) => {
            if (qParams.id) {
                this.editProductId = qParams.id;
                this.commonService
                    .getCommonProductDetails(this.editProductId)
                    .subscribe((res: any) => {
                        this.isModify = true;
                        this.editProduct = res.data.product;
                        console.log('res', res);
                        this.fillModificationData(this.editProduct);
                    });
            }
        });
    }
    get f() {
        return this.createProductForm.controls;
    }
    fillModificationData(product: MaufacturedProductI) {
        this.createProductForm.patchValue(product);
        this.ingredients = product.ingredients;
        this.allergies = product.allergies;
        this.plantIDs = product.plants;
    }
    ingridentInput(event) {
        if (this.createProductForm.get('ingredient').value) {
            this.ingredients.push(
                this.createProductForm.get('ingredient').value
            );
            this.createProductForm.get('ingredient').reset();
        }
    }
    alliergiesInput(event) {
        if (this.createProductForm.get('allergy').value) {
            this.allergies.push(this.createProductForm.get('allergy').value);
            this.createProductForm.get('allergy').reset();
        }
    }

    addProduct() {
        if (this.createProductForm.invalid) {
            this.snackBar.open('Invalid Form', 'Close', {
                duration: 3000,
                panelClass: ['alert-red'],
            });
            return;
        }
        if (this.ingredients.length === 0) {
            this.snackBar.open("Ingredients can't be empty!", 'Close', {
                duration: 3000,
                panelClass: ['alert-red'],
            });
            return;
        }

        const formData = this.createProductForm.value;
        delete formData.allergy;
        delete formData.ingredient;
        const request: CreateProductsRequest = formData;
        request.ingredients = this.ingredients;
        request.allergies = this.allergies;
        request.plants = this.plantIDs;
        if (this.isModify) {
            this.manufactureService
                .updateProduct(this.editProduct._id, request)
                .subscribe(
                    (res) => {
                        setTimeout(() => {
                            this.router.navigateByUrl(
                                '/manufacturer/product-listing'
                            );
                        }, 1500);

                        this.snackBar.open(
                            'Product Updated Successfully..!',
                            'Close',
                            {
                                duration: 2000,
                            }
                        );
                    },
                    (err: any) => {
                        console.log(err);
                    }
                );
        } else {
            this.manufactureService.addProduct(request).subscribe(
                (res) => {
                    setTimeout(() => {
                        this.router.navigateByUrl(
                            '/manufacturer/product-listing'
                        );
                    }, 1500);

                    this.snackBar.open(
                        'Product added Successfully..!',
                        'Close',
                        {
                            duration: 3000,
                        }
                    );
                },
                (err: any) => {
                    console.log(err);
                }
            );
        }
    }
    showScanMenu() {
        this.dialog.open(this.scanQRCodeDialog);
    }
    matClose(): void {
        this.enterdPlantId = '';
        this.dialog.closeAll();
    }
    addPlant() {
        this.commonService.getCommonPlantDetails(this.enterdPlantId).subscribe(
            (details) => {
                this.dialog.closeAll();
                const plantDetails = details?.data?.plant;
                if (plantDetails) {
                    this.plantIDs.push(this.enterdPlantId);
                    this.enterdPlantId = '';
                } else {
                    this.snackBar.open('Invalid Plant', 'Close', {
                        duration: 4000,
                        panelClass: ['alert-red'],
                    });
                }
            },
            (err: any) => {
                console.log(err);
                this.snackBar.open('Invalid Plant', 'Close', {
                    duration: 4000,
                    panelClass: ['alert-red'],
                });
            }
        );
    }
    presentScanAction(): void {
        const dialogRef = this.dialog.open(ScanMorePlantsComponent, {});
        dialogRef.afterClosed().subscribe((result) => {
            this.enterdPlantId = result;
            this.addPlant();
            console.log(result);
        });
    }
    plantDetils(plant: any) {
        console.log(plant);
        this.commonService.$passData.next(plant);
        this.sideNav.toggle();
    }
    closeDrawer(event) {
        this.sideNav.close();
    }
}
