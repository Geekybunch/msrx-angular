import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from 'app/core/admin/products/products.service';
import { Products } from './products.interfaces';
import { displayedColumns } from './products.interfaces';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
    public pageSize = 10;
    public totalResults: number;
    public filterType: string;
    public filterName: string;
    public filterApproved: boolean;
    public viewDetails: any;

    visibleColumns = displayedColumns;

    dataSource = new MatTableDataSource<Products>();
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild('sidenav') sideNav: MatSidenav;

    constructor(private productServices: ProductsService) {}

    ngOnInit(): void {
        this.getProductsData();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    getProductsData() {
        this.paginator.pageSize = this.paginator.pageSize
            ? this.paginator.pageSize
            : 20;

        let pageparams = `?limit=${this.paginator.pageSize}&page=${
            this.paginator.pageIndex + 1
        }`;
        let productType = this.filterType
            ? `&manufacturer=${this.filterType}`
            : '';
        let productName = this.filterName ? `&name=${this.filterName}` : '';

        let totalparams = `${pageparams + productType + productName}`;

        this.productServices.getProductLists(totalparams).subscribe(
            (response: any) => {
                this.dataSource = response.data.result.results;
                this.totalResults = response.data.result.totalResults;
                console.log(response.data.result.results);
            },
            (err: any) => {
                console.log(err);
            }
        );
    }
    filterBytype(change: MatSelectChange): void {
        this.filterType = change.value;
        console.log(change.value);
        this.getProductsData();
    }
    filterByName(query: string): void {
        this.filterName = query;
        this.getProductsData();
    }

    sideToggle(event) {
        this.viewDetails = event;
        console.log(event);
        this.sideNav.toggle();
    }
}
