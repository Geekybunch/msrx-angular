import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { CommonService } from 'app/core/common/common.service';
import { InventoryService } from 'app/core/inventory/inventory.service';
import { ManufactureService } from 'app/core/manufacture/manufacture.service';
import {
    CreateProductsRequest,
    DisplayedManufactrors,
} from 'app/core/manufacture/maufacturor.interface';
import { AddManufacturerComponent } from 'app/modules/manufacturer/add-manufacturer/add-manufacturer.component';
import { cloneDeep } from 'lodash';
import { Observable, Subject } from 'rxjs';

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
    public pageSize = 10;
    public totalResults: number;
    public filterName: string;
    public viewDetails: any;
    public noRecords: any;
    public plantsData: any;
    public plantId: any;
    public filterInventoryDetails: any = [];
    public role: any;

    visibleColumns = DisplayedManufactrors;
    dataSource = new MatTableDataSource<CreateProductsRequest>();
    public businessInput = new Subject<string>();
    plantId$: Observable<number[]>;
    menuButton: boolean = true;

    constructor(
        private manufactrorService: ManufactureService,
        private commonService: CommonService,
        private snackBar: MatSnackBar,
        private confirmationService: FuseConfirmationService,
        private matDialog: MatDialog,
        private router: Router,
        private inventoryService: InventoryService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.role = this.authService.userRole;
        if (this.role.modelId.employer.businessType === 'Dispensary') {
            this.getInventoryDetails();
            this.menuButton = false;
        }
        if (this.router.url == '/manufacturer/product-listing') {
            this.getManufacturedProducts();
        } else if (this.router.url == '/manufacturer/inventory-details') {
            this.menuButton = false;
            this.getInventoryDetails();
        } else if (this.router.url == '/manufacturer/update-inventory') {
            this.getInventoryLogs();
            this.menuButton = false;
        }
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    getManufacturedProducts() {
        this.paginator.pageSize = this.paginator.pageSize
            ? this.paginator.pageSize
            : 10;
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
    getInventoryDetails() {
        this.paginator.pageSize = this.paginator.pageSize
            ? this.paginator.pageSize
            : 10;
        let pageparams = `?limit=${this.paginator.pageSize}&page=${
            this.paginator.pageIndex + 1
        }`;
        let productName = this.filterName ? `&name=${this.filterName}` : '';
        let totalparams = `${pageparams + productName}`;
        this.inventoryService.getInventoryDetails(totalparams).subscribe(
            (response: any) => {
                this.noRecords = response.data.quantity;
                this.totalResults = response.data.quantity.length;
                for (let i = 0; i < response.data.quantity.length; i++) {
                    this.filterInventoryDetails.push(
                        response.data.quantity[i].materialId
                    );
                }
                this.dataSource = this.filterInventoryDetails;
            },
            (err: any) => {
                console.log(err);
            }
        );
    }
    getInventoryLogs() {
        this.paginator.pageSize = this.paginator.pageSize
            ? this.paginator.pageSize
            : 10;
        let pageparams = `?limit=${this.paginator.pageSize}&page=${
            this.paginator.pageIndex + 1
        }`;
        let productName = this.filterName ? `&name=${this.filterName}` : '';
        let totalparams = `${pageparams + productName}`;
        this.inventoryService.getInventoryLogs(totalparams).subscribe(
            (response: any) => {
                console.log(response);
                this.noRecords = response.data.quantity.results;
                this.totalResults = response.data.quantity.totalResults;
                console.log(response.data.quantity.results);
                for (
                    let i = 0;
                    i < response.data.quantity.results.length;
                    i++
                ) {
                    this.filterInventoryDetails.push(
                        response.data.quantity.results[i].materialId
                    );
                }
                this.dataSource = this.filterInventoryDetails;
                console.log(this.filterInventoryDetails);
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
        this.commonService.$passData.next(event);
        this.sideNav.toggle();
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
        this.router.navigate(['/manufacturer/add-manufactured-good'], {
            queryParams: {
                id: productData._id,
            },
            replaceUrl: true,
        });
        // console.log(productData._id);

        // let EditPlant = this.matDialog.open(AddManufacturerComponent, {
        //     autoFocus: false,
        //     data: {
        //         productData: cloneDeep(productData),
        //     },
        // });
        // EditPlant.afterClosed().subscribe((result) => {
        //     this.getManufacturedProducts();
        // });
    }
    closeDrawer(event) {
        this.sideNav.close();
    }
}
