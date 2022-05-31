import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { BusinessService } from 'app/core/admin/business/business.service';
import { PlantsService } from 'app/core/admin/plants/plants.service';
import { map, Observable, startWith } from 'rxjs';
import { Plants } from './plants.interfaces';
import { displayedColumns } from './plants.interfaces';

@Component({
    selector: 'app-plants',
    templateUrl: './plants.component.html',
    styleUrls: ['./plants.component.scss'],
})
export class PlantsComponent implements OnInit {
    public pageSize = 10;
    public totalResults: number;
    public noRecords: any;
    public filterbatchNumberValue: string;
    public filterPlantTest: boolean;
    public filterPlantProcess: boolean;
    public statusChange: any;
    public viewDetails: any;
    public dropDownArray: any = [];
    public dropDownlist: string[] = [];
    public filtergeneticStainValue: any;
    public filterbusinessValue: string;
    public filterCompany: string;
    public businessLength: any;
    public filteredList5: any;

    dataSource = new MatTableDataSource<Plants>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    @ViewChild('sidenav') sideNav: MatSidenav;

    constructor(
        private plantsServices: PlantsService,
        private businessService: BusinessService
    ) {}

    visibleColumns = displayedColumns;

    public geneticStainTypes = ['Indica', 'Sativa', 'Hybrid', 'Seedlings'];
    public filteredList = this.geneticStainTypes.slice();

    ngOnInit(): void {
        this.getplantsData();
        this.getBusinesslist();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    getplantsData() {
        this.paginator.pageSize = this.paginator.pageSize
            ? this.paginator.pageSize
            : 20;

        let pageparams = `?limit=${this.paginator.pageSize}&page=${
            this.paginator.pageIndex + 1
        }`;

        let batchNumber = this.filterbatchNumberValue
            ? `&batchNumber=${this.filterbatchNumberValue}`
            : '';
        let geneticStainTypes = this.filtergeneticStainValue
            ? `&geneticStain=${this.filtergeneticStainValue}`
            : '';
        let businesstype = this.filterbusinessValue
            ? `&grower=${this.filterbusinessValue}`
            : '';
        let geneticCompanyName = this.filterCompany
            ? `&geneticCompany=${this.filterCompany}`
            : '';
        let plantTest = this.filterPlantTest
            ? `&plantTest=${this.filterPlantTest}`
            : '';
        let plantProcess = this.filterPlantProcess
            ? `&plantProcess=${this.filterPlantProcess}`
            : '';

        let totalparams = `${
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
    getBusinesslist() {
        this.paginator.pageSize = this.paginator.pageSize
            ? this.paginator.pageSize
            : 20;
        let pageparams = `?limit=${this.paginator.pageSize}&page=${
            this.paginator.pageIndex + 1
        }`;
        this.businessService.getBusinessDetails(pageparams).subscribe(
            (response: any) => {
                this.businessLength = response.data.businesses.totalResults;
                console.log(this.businessLength);
                this.getDropDownlist();
            },
            (err: any) => {
                console.log(err);
            }
        );
    }
    getDropDownlist() {
        console.log(this.businessLength);
        this.paginator.pageSize = this.paginator.pageSize
            ? this.paginator.pageSize
            : this.businessLength;
        let pageparams = `?limit=${this.businessLength}&page=${
            this.paginator.pageIndex + 1
        }`;
        this.businessService.getBusinessDetails(pageparams).subscribe(
            (response: any) => {
                this.dropDownArray = response.data.businesses.results;
                let filteredArr = [];
                this.dropDownArray.filter((element: any) => {
                    if (element.businessType === 'Cultivator') {
                        filteredArr.push(element);
                    }
                });
                this.dropDownlist = filteredArr;
                this.filteredList5 = this.dropDownlist.slice();
                console.log('fgdgd', filteredArr);
                // const filteredArr = this.dropDownArray.reduce(
                //     (thing, current) => {
                //         const x = thing.find(
                //             (item) => item.businessType === current.businessType
                //         );
                //         if (!x) {
                //             return thing.concat([current]);
                //         } else {
                //             return thing;
                //         }
                //     },
                //     []
                // );
                // this.dropDownlist = filteredArr;
                // console.log('dfddg', this.dropDownArray);
            },
            (err: any) => {
                console.log(err);
            }
        );
    }

    filterByBusinesstype(change: MatSelectChange): void {
        this.filterbusinessValue = change.value;
        this.getplantsData();
    }
    filterGeneticStain(change: MatSelectChange): void {
        this.filtergeneticStainValue = change.value;
        this.getplantsData();
    }
    filterByBatchNumber(query: string): void {
        this.filterbatchNumberValue = query;
        this.getplantsData();
    }
    filterByCompany(query: string): void {
        this.filterCompany = query;
        this.getplantsData();
    }

    toggleplantTest(change: MatSlideToggleChange): void {
        this.filterPlantTest = change.checked;
        this.getplantsData();
    }
    toggleplantprocess(change: MatSlideToggleChange): void {
        this.filterPlantProcess = change.checked;
        this.getplantsData();
    }
    sideToggle(event) {
        this.viewDetails = event;
        console.log(event);
        this.sideNav.toggle();
    }
}
