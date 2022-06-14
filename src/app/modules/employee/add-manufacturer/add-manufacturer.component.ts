import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
    createProductForm: FormGroup;
    ingredients: string[] = [];
    allergies: string[] = [];
    plantIDs: string[] = [];

    public editProduct = this.data;
    addOnBlur = true;
    constructor(
        private snackBar: MatSnackBar,
        private manufactureService: ManufactureService,
        @Inject(MAT_DIALOG_DATA) private data: { productData: any },
        private _matDialogRef: MatDialogRef<AddManufacturerComponent>
    ) {}

    ngOnInit(): void {
        console.log(this.editProduct);
        this.createProductForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.required),
            sku: new FormControl(null, Validators.required),
            ingredient: new FormControl(null),
            dosage: new FormControl(null, Validators.required),
            allergy: new FormControl(null),
        });
        if (this.editProduct.productData) {
            this.fillModificationData(this.editProduct.productData);
        }
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
        const formData = this.createProductForm.value;
        delete formData.allergy;
        delete formData.ingredient;

        const request: CreateProductsRequest = formData;
        request.ingredients = this.ingredients;
        request.allergies = this.allergies;
        request.plants = this.plantIDs;
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
                    this.snackBar.open(err.error.message, 'Close', {
                        duration: 2000,
                        panelClass: ['alert-red'],
                    });
                    console.log(err);
                }
            );
    }
}
