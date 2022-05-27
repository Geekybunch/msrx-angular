import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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

    dataSource = new MatTableDataSource<Plants>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

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
            : 10;
        this.plantsServices
            .getplantsDetails(
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
