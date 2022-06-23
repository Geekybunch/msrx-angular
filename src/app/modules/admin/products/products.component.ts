import {
    Component,
    Input,
    OnInit,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { BusinessService } from 'app/core/admin/business/business.service';
import { PlantsService } from 'app/core/admin/plants/plants.service';
import { ProductsService } from 'app/core/admin/products/products.service';
import { cloneDeep } from 'lodash';
import { debounceTime, distinctUntilChanged, Observable, Subject } from 'rxjs';
import { Products } from './products.interfaces';
import { displayedColumns } from './products.interfaces';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild('sidenav') sideNav: MatSidenav;
    @ViewChild(MatSidenavContainer) sidenavContainer: MatSidenavContainer;
    @Input() position: 'start' | 'end';
    public pageSize = 10;
    public totalResults: number;
    public filterType: string;
    public filterName: string;
    public filterApproved: boolean;
    public viewDetails: any;
    public noRecords: any;
    public selectedBusiness;

    plantsData: any;
    filteredPlants: any = [];
    plantId: any;

    visibleColumns = displayedColumns;
    public businesses: string[] = [];
    dataSource = new MatTableDataSource<Products>();
    public businessInput = new Subject<string>();

    plantId$: Observable<number[]>;

    constructor(
        private productServices: ProductsService,
        private businessService: BusinessService,
        private matDialog: MatDialog,
        private plantsServices: PlantsService
    ) {}

    ngOnInit(): void {
        this.getProductsData();
        this.getBusinessDropDownlist();
        this.searchBusiness();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    getProductsData() {
        this.paginator.pageSize = this.paginator.pageSize
            ? this.paginator.pageSize
            : 10;

        let pageparams = `?limit=${this.paginator.pageSize}&page=${
            this.paginator.pageIndex + 1
        }`;
        let productType = this.selectedBusiness
            ? `&manufacturer=${this.selectedBusiness}`
            : '';
        let productName = this.filterName ? `&name=${this.filterName}` : '';

        let totalparams = `${pageparams + productType + productName}`;

        this.productServices.getProductLists(totalparams).subscribe(
            (response: any) => {
                this.noRecords = response.data.result.results;
                this.dataSource = response.data.result.results;
                this.totalResults = response.data.result.totalResults;
                console.log(response.data.result.results);
            },
            (err: any) => {
                console.log(err);
            }
        );
    }
    getBusinessDropDownlist = (businessName?: string): void => {
        console.log('get businesses');
        let pageParams = '?limit=5&page=1&businessType=Manufacturer';
        if (businessName) {
            pageParams += '&businessName=' + businessName;
        }
        this.businessService.getBusinessDetails(pageParams).subscribe(
            (response: any) => {
                this.businesses = response.data.businesses.results.map(
                    (obj: any) => ({
                        _id: obj._id,
                        businessName: obj.businessName,
                    })
                );
            },
            (err: any) => {
                console.log(err);
            }
        );
    };

    searchBusiness(): void {
        this.businessInput
            .pipe(debounceTime(500), distinctUntilChanged())
            .subscribe((searchBusinessName) => {
                console.log(searchBusinessName);
                this.getBusinessDropDownlist(searchBusinessName);
            });
    }

    onSearchBusiness(val): void {
        this.businessInput.next(val.term);
    }

    filterByBusiness(): void {
        console.log(this.selectedBusiness);
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
    getPlantsDetails(id: number) {
        this.plantId = id;
        const pageparams = ``;
        this.plantsServices.getplantsDetails(pageparams).subscribe(
            (response: any) => {
                console.log('plants data', response);
                this.plantsData = response.data.result.results;
                console.log(this.plantsData);
                this.getFilteredPlant();
            },
            (err: any) => {
                console.log(err);
            }
        );
    }

    getFilteredPlant() {
        this.filteredPlants = [];
        this.plantsData.filter((element: any) => {
            if (element._id === this.plantId) {
                this.filteredPlants.push(element);
            }
        });
        console.log(this.filteredPlants);
    }
}
