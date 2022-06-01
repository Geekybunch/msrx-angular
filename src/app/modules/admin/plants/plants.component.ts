import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { BusinessService } from 'app/core/admin/business/business.service';
import { PlantsService } from 'app/core/admin/plants/plants.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Plants } from './plants.interfaces';
import { displayedColumns } from './plants.interfaces';

@Component({
    selector: 'app-plants',
    templateUrl: './plants.component.html',
    styleUrls: ['./plants.component.scss'],
})
export class PlantsComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild('sidenav') sideNav: MatSidenav;
    public pageSize = 10;
    public totalResults: number;
    public noRecords: any;
    public filterbatchNumberValue: string;
    public filterPlantTest: boolean;
    public filterPlantProcess: boolean;
    public statusChange: any;
    public viewDetails: any;
    public businesses: string[] = [];
    public filtergeneticStainValue: any;
    public filterCompany: string;
    public selectedBusiness;
    public businessInput = new Subject<string>();
    public geneticStainTypes = ['Indica', 'Sativa', 'Hybrid', 'Seedlings'];
    public filteredList = this.geneticStainTypes.slice();
    visibleColumns = displayedColumns;
    dataSource = new MatTableDataSource<Plants>();

    constructor(
        private plantsServices: PlantsService,
        private businessService: BusinessService
    ) {}

    ngOnInit(): void {
        this.getPlantsData();
        this.getBusinessDropDownlist();
        this.searchBusiness();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    getPlantsData(): void {
        this.paginator.pageSize = this.paginator.pageSize
            ? this.paginator.pageSize
            : 20;

        const pageparams = `?limit=${this.paginator.pageSize}&page=${
            this.paginator.pageIndex + 1
        }`;

        const batchNumber = this.filterbatchNumberValue
            ? `&batchNumber=${this.filterbatchNumberValue}`
            : '';
        const geneticStainTypes = this.filtergeneticStainValue
            ? `&geneticStain=${this.filtergeneticStainValue}`
            : '';
        const businesstype = this.selectedBusiness
            ? `&grower=${this.selectedBusiness}`
            : '';
        const geneticCompanyName = this.filterCompany
            ? `&geneticCompany=${this.filterCompany}`
            : '';
        const plantTest = this.filterPlantTest
            ? `&plantTest=${this.filterPlantTest}`
            : '';
        const plantProcess = this.filterPlantProcess
            ? `&plantProcess=${this.filterPlantProcess}`
            : '';

        const totalparams = `${
            pageparams +
            batchNumber +
            geneticStainTypes +
            businesstype +
            geneticCompanyName +
            plantTest +
            plantProcess
        }`;
        this.plantsServices.getplantsDetails(totalparams).subscribe(
            (response: any) => {
                this.noRecords = response.data.result.results;
                this.dataSource = response.data.result.results;
                this.totalResults = response.data.result.totalResults;
            },
            (err: any) => {
                console.log(err);
            }
        );
    }

    getBusinessDropDownlist = (businessName?: string): void => {
        console.log('get businesses');
        let pageParams = '?limit=5&page=1&businessType=Cultivator';
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
        this.getPlantsData();
    }

    filterGeneticStain(change: MatSelectChange): void {
        this.filtergeneticStainValue = change.value;
        this.getPlantsData();
    }

    filterByBatchNumber(query: string): void {
        this.filterbatchNumberValue = query;
        this.getPlantsData();
    }

    filterByCompany(query: string): void {
        this.filterCompany = query;
        this.getPlantsData();
    }

    toggleplantTest(change: MatSlideToggleChange): void {
        this.filterPlantTest = change.checked;
        this.getPlantsData();
    }

    toggleplantprocess(change: MatSlideToggleChange): void {
        this.filterPlantProcess = change.checked;
        this.getPlantsData();
    }

    sideToggle(event): void {
        this.viewDetails = event;
        this.sideNav.toggle();
    }
}
