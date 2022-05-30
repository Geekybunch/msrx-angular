import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { PlantsService } from 'app/core/admin/plants/plants.service';
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
    public filterType: string;
    public filterName: string;
    public filterApproved: boolean;
    public statusChange: any;
    public viewDetails: any;

    dataSource = new MatTableDataSource<Plants>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    @ViewChild('sidenav') sideNav: MatSidenav;

    constructor(private plantsServices: PlantsService) {}

    visibleColumns = displayedColumns;

    ngOnInit(): void {
        this.getplantsData();
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

        this.plantsServices.getplantsDetails(pageparams).subscribe(
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
        this.getplantsData();
    }
    filterByName(query: string): void {
        this.filterName = query;
        this.getplantsData();
    }
    toggleApproved(change: MatSlideToggleChange): void {
        this.filterApproved = change.checked;
        this.getplantsData();
    }
    sideToggle(event) {
        this.viewDetails = event;
        console.log(event);
        this.sideNav.toggle();
    }
}
