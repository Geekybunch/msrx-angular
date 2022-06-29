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
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'app/core/common/common.service';
import { ManufactureService } from 'app/core/manufacture/manufacture.service';
import {
    CreateProductsRequest,
    MaufacturedProductI,
} from 'app/core/manufacture/maufacturor.interface';
export interface Fruit {
    name: string;
}

@Component({
    selector: 'app-add-manufacturer',
    templateUrl: './add-manufacturer.component.html',
    styleUrls: ['./add-manufacturer.component.scss'],
})
export class AddManufacturerComponent implements OnInit {
    @ViewChild('scanQRCodeDialog') scanQRCodeDialog: TemplateRef<any>;
    createProductForm: FormGroup;
    ingredients: string[] = [];
    allergies: string[] = [];
    plantIDs: string[] = [];
    public enterdPlantId: string;
    isModify = false;
    public editProduct = this.data;
    addOnBlur = true;

    constructor(
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private manufactureService: ManufactureService,
        private commonService: CommonService,
        private activatedRouter: ActivatedRoute,
        @Inject(MAT_DIALOG_DATA) private data: { productData: any },
        private _matDialogRef: MatDialogRef<any>
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
        if (this.editProduct.productData) {
            this.isModify = true;
            this.fillModificationData(this.editProduct.productData);
        }
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
                .updateProduct(this.editProduct.productData._id, request)
                .subscribe(
                    (res) => {
                        this._matDialogRef.close();
                        console.log(res);
                        this.snackBar.open(
                            'Product Updated Successfully..!',
                            'Close',
                            {
                                duration: 2000,
                            }
                        );
                    },
                    (err: any) => {
                        this._matDialogRef.close();
                        console.log(err);
                    }
                );
        } else {
            this.manufactureService.addProduct(request).subscribe(
                (res) => {
                    this.snackBar.open(
                        'Product added Successfully..!',
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
        }
    }
    showScanMenu() {
        this.dialog.open(this.scanQRCodeDialog);
    }
    matClose() {
        this.dialog.closeAll();
        // this._matDialogRef.close(templateRef);
        // // this._matDialogRef.afterClosed();
        // this.dialog.afterAllClosed(this.scanQRCodeDialog);
        // // this.dialog.closeAll();
        // // this.dialog.closeAll();
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
}
