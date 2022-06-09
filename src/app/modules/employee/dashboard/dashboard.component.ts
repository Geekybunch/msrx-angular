import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from 'app/core/employee/dashboard/dashboard.service';

import {
    ApexAxisChartSeries,
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexPlotOptions,
    ApexYAxis,
    ApexLegend,
    ApexStroke,
    ApexXAxis,
    ApexFill,
    ApexTooltip,
} from 'ng-apexcharts';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    fill: ApexFill;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
};

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    @ViewChild('chart', { static: false }) chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;
    public userDetails: any;
    public startDate;
    public endDate;
    public plantProcessCount: number;
    public plantTestedCount: number;
    public plantsTestedData: any;
    public plantsProcessedData: any;
    public plantsAddedData: any;

    public plantsTestedId = [];
    public plantsTestedCount = [];

    public plantsProcessedId = [];
    public plantsProcessedCount = [];

    public plantsAddedId = [];
    public plantsAddedCount = [];

    public currentMonth: any;

    constructor(private dashboardService: DashboardService) {}

    ngOnInit(): void {
        this.getDates();
        this.userDetails = JSON.parse(localStorage.getItem('userData'));
        this.getDashboardData();
        this.analyticsChartOptions([], []);
    }
    getDates() {
        let d = new Date();
        this.endDate = new DatePipe('en-US').transform(
            d.toLocaleDateString(),
            'yyyy-MM-dd'
        );
        d.setMonth(d.getMonth() - 1);
        this.startDate = new DatePipe('en-US').transform(
            d.toLocaleDateString(),
            'yyyy-MM-dd'
        );
    }

    getDashboardData(start?: any, end?: any) {
        let params: any;
        if (start && !end) {
        } else {
            if (start && end) {
                params = `?from=${start}&to=${end}`;
            } else {
                params = `?from=${this.startDate}&to=${this.endDate}`;
            }
            this.dashboardService
                .getDashboardData(params)
                .subscribe((respose: any) => {
                    console.log('dgdfgd', respose);
                    this.plantProcessCount = respose.data.plantCount;
                    this.plantTestedCount = respose.data.plantTestedCount;
                    this.plantsTestedData = respose.data.plantsAdded;
                    this.plantsProcessedData = respose.data.plantsProcessed;
                    this.plantsAddedData = respose.data.plantsTested;
                    // this.businessStatsData = respose.data.businessStats;

                    this.plantsTestedId = [];
                    this.plantsTestedCount = [];

                    this.plantsProcessedId = [];
                    this.plantsProcessedCount = [];

                    this.plantsAddedId = [];
                    this.plantsAddedCount = [];

                    this.plantsTestedData.forEach((element) => {
                        this.plantsTestedId.push(element._id);
                        this.plantsTestedCount.push(element.count);
                    });

                    this.plantsProcessedData.forEach((element) => {
                        this.plantsProcessedId.push(element._id);
                        this.plantsProcessedCount.push(element.count);
                    });

                    this.plantsAddedData.forEach((element) => {
                        this.plantsAddedId.push(element._id);
                        this.plantsAddedCount.push(element.count);
                    });

                    this.analyticsChartOptions(
                        this.plantsTestedId,
                        this.plantsTestedCount
                        // this.plantsProcessedId,
                        // this.plantsProcessedCount,
                        // this.plantsAddedId,
                        // this.plantsAddedCount
                    );
                });
        }
    }
    filterByStartDate(event) {
        this.startDate = new DatePipe('en-US').transform(
            event.value,
            'yyyy-MM-dd'
        );

        this.getDashboardData(this.startDate, null);
    }
    filterByEndDate(event) {
        this.endDate = new DatePipe('en-US').transform(
            event.value,
            'yyyy-MM-dd'
        );
        this.getDashboardData(this.startDate, this.endDate);
    }

    analyticsChartOptions(series: number[], labels): void {
        this.chartOptions = {
            series: [
                {
                    name: 'Tested',
                    data: this.plantsAddedId,
                },
                {
                    name: 'Grown',
                    data: this.plantsTestedCount,
                },
                {
                    name: 'Processed',
                    data: this.plantsProcessedId,
                },
            ],
            chart: {
                type: 'bar',
                height: 350,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent'],
            },
            xaxis: {
                categories: this.plantsTestedId,
            },
            yaxis: {
                title: {},
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return ' ' + val + ' count';
                    },
                },
            },
        };
    }
}
