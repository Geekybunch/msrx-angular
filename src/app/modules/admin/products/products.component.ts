import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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

    visibleColumns = displayedColumns;

    dataSource = new MatTableDataSource<Products>();
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

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
            : 10;
        this.productServices
            .getProductLists(
                this.paginator.pageSize,
                this.paginator.pageIndex + 1
            )
            .subscribe(
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
}
