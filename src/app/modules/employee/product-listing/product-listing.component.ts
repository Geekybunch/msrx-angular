import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CommonService } from 'app/core/common/common.service';
import { ManufactureService } from 'app/core/manufacture/manufacture.service';
import {
    CreateProductsRequest,
    DisplayedManufactrors,
} from 'app/core/manufacture/maufacturor.interface';
import { cloneDeep } from 'lodash';
import { Observable, Subject } from 'rxjs';
import { AddManufacturerComponent } from '../add-manufacturer/add-manufacturer.component';

@Component({
    selector: 'app-product-listing',
    templateUrl: './product-listing.component.html',
    styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild('sidenav') sideNav: MatSidenav;
    @ViewChild(MatSidenavContainer) sidenavContainer: MatSidenavContainer;
    @Input() position: 'start' | 'end';
    public pageSize = 20;
    public totalResults: number;
    public filterName: string;
    public viewDetails: any;
    public noRecords: any;
    public plantsData: any;
    public plantId: any;

    visibleColumns = DisplayedManufactrors;
    dataSource = new MatTableDataSource<CreateProductsRequest>();
    public businessInput = new Subject<string>();
    plantId$: Observable<number[]>;

    constructor(
        private manufactrorService: ManufactureService,
        private commonService: CommonService,
        private snackBar: MatSnackBar,
        private confirmationService: FuseConfirmationService,
        private matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.getManufacturedProducts();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    getManufacturedProducts() {
        this.paginator.pageSize = this.paginator.pageSize
            ? this.paginator.pageSize
            : 20;
        let pageparams = `?limit=${this.paginator.pageSize}&page=${
            this.paginator.pageIndex + 1
        }`;
        let productName = this.filterName ? `&name=${this.filterName}` : '';
        let totalparams = `${pageparams + productName}`;
        this.manufactrorService.getProductList(totalparams).subscribe(
            (response: any) => {
                this.noRecords = response.data.products.results;
                this.dataSource = response.data.products.results;
                this.totalResults = response.data.products.totalResults;
            },
            (err: any) => {
                console.log(err);
            }
        );
    }

    filterByName(query: string): void {
        this.filterName = query;
        this.getManufacturedProducts();
    }

    openProductDetails(event) {
        this.viewDetails = event;
        this.sideNav.toggle();
    }

    openPlantDetails(id: number) {
        this.plantId = id;
        this.commonService.getCommonPlantDetails(this.plantId).subscribe(
            (response: any) => {
                console.log('plants data', response);
                this.plantsData = response.data.plant;
                console.log(this.plantsData);
            },
            (err: any) => {
                console.log(err);
            }
        );
    }
    deleteProduct(productID: string) {
        const confirmation = this.confirmationService.open({
            title: 'Are you sure ?',
            message:
                'Do you really want to delete this Product? This process cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });
        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                this.manufactrorService.deleteProductList(productID).subscribe(
                    (response: any) => {
                        console.log(response);
                        this.getManufacturedProducts();
                        this.snackBar.open(response.message, 'Close', {
                            duration: 2000,
                        });
                    },
                    (err: any) => {
                        this.snackBar.open(err.error.message, 'Close', {
                            duration: 2000,
                            panelClass: ['alert-red'],
                        });
                        console.log(err);
                    }
                );
            }
        });
    }
    editProductDialog(productData: any) {
        let EditPlant = this.matDialog.open(AddManufacturerComponent, {
            autoFocus: false,
            data: {
                productData: cloneDeep(productData),
            },
        });
        EditPlant.afterClosed().subscribe((result) => {
            this.getManufacturedProducts();
        });
    }
}
