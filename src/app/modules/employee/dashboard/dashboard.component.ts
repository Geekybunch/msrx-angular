import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from 'app/core/employee/dashboard/dashboard.service';

import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexFill,
    ApexYAxis,
    ApexTooltip,
    ApexMarkers,
    ApexXAxis,
    ApexPlotOptions,
} from 'ng-apexcharts';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis | ApexYAxis[];
    labels: string[];
    stroke: any; // ApexStroke;
    markers: ApexMarkers;
    plotOptions: ApexPlotOptions;
    fill: ApexFill;
    tooltip: ApexTooltip;
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
    public businessStatsData: any;

    public businessStatsId = [];
    public businessStatsCount = [];

    public currentMonth: any;

    constructor(private dashboardService: DashboardService) {}

    ngOnInit(): void {
        this.userDetails = JSON.parse(localStorage.getItem('userData'));
        this.getDashboardData();
        this.businessStatsChartoption([], []);
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
        this.getDates();
        let params: any;
        if (start && end) {
            params = `?from=${start}&to=${end}`;
        } else {
            params = `?from=${this.startDate}&to=${this.endDate}`;
        }
        this.dashboardService
            .getDashboardData(params)
            .subscribe((respose: any) => {
                console.log('dgdfgd', respose);
                this.plantProcessCount = respose.data.plantProcessCount;
                this.plantTestedCount = respose.data.plantTestedCount;
                this.businessStatsData = respose.data.businessStats;

                this.businessStatsId = [];
                this.businessStatsCount = [];

                // this.businessStatsData.rangeStats.forEach((element) => {
                //     this.businessStatsId.push(element._id);
                //     this.businessStatsCount.push(element.count);
                // });
                // this.businessStatsChartoption(
                //     this.businessStatsCount,
                //     this.businessStatsId
                // );
            });
    }
    filterByStartDate(event) {
        this.startDate = new DatePipe('en-US').transform(
            event.value,
            'yyyy-MM-dd'
        );
        this.getDashboardData(this.startDate, this.endDate);
    }
    filterByEndDate(event) {
        this.endDate = new DatePipe('en-US').transform(
            event.value,
            'yyyy-MM-dd'
        );
        this.getDashboardData(this.startDate, this.endDate);
    }

    businessStatsChartoption(series: number[], labels): void {
        this.chartOptions = {
            series: [
                {
                    name: 'Business',
                    type: 'column',
                    data: series,
                },
            ],
            chart: {
                height: 350,
                type: 'line',
                stacked: false,
                zoom: {
                    enabled: false,
                },
            },

            stroke: {
                width: [0, 2],
                curve: 'smooth',
            },
            plotOptions: {
                bar: {
                    columnWidth: '10%',
                },
            },

            fill: {
                opacity: [0.85, 0.25, 1],
                gradient: {
                    inverseColors: false,
                    shade: 'light',
                    type: 'vertical',
                    opacityFrom: 0.85,
                    opacityTo: 0.55,
                    stops: [0, 100, 100, 100],
                },
            },
            labels: labels,
            markers: {
                size: 0,
            },
            xaxis: {
                type: 'datetime',
            },
            yaxis: {
                show: false,
                title: {
                    text: '',
                },
                min: 0,
            },
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: function (y) {
                        if (typeof y !== 'undefined') {
                            return y.toFixed(0) + ' points';
                        }
                        return y;
                    },
                },
            },
        };
    }
}
