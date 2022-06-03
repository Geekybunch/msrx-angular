import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { DashboardService } from 'app/core/admin/dashboard/dashboard.service';
import { DatePipe } from '@angular/common';
import ApexCharts from 'apexcharts';

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
    public businessStatsOptions: Partial<ChartOptions>;
    public deliveriesStatsOptions: Partial<ChartOptions>;
    public patientStatsOptions: Partial<ChartOptions>;
    public plantsStatsOptions: Partial<ChartOptions>;
    public productsStatsOptions: Partial<ChartOptions>;

    public userDetails: any;
    public startDate;
    public endDate;
    public businessStatsData: any;
    public deliveriesStatsData: any;
    public patientStatsData: any;
    public plantsStatsData: any;
    public productsStatsData: any;

    public businessStatsId = [];
    public businessStatsCount = [];

    public deliveriesStatsId = [];
    public deliveriesStatsCount = [];

    public patientStatsId = [];
    public patientStatsCount = [];

    public plantsStatsId = [];
    public plantsStatsCount = [];

    public productsStatsId = [];
    public productsStatsCount = [];

    public currentMonth: any;

    constructor(private dashboardService: DashboardService) {}

    ngOnInit(): void {
        this.userDetails = JSON.parse(localStorage.getItem('userData'));
        this.getDashboardData();
        this.businessStatsChartoption([], []);
        this.deliveriesStatsChartoption([], []);
        this.productsStatsChartoption([], []);
        this.plantsStatsChartoption([], []);
        this.patientStatsChartoption([], []);
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
        // let start = this.startDate ? `?from=${this.startDate}` : '';
        // let end = this.endDate ? `&to=${this.endDate}` : '';
        // let params = `?from=${this.startDate}&to=${this.endDate}`;
        // const params = start + end;
        this.dashboardService
            .getDashboardData(params)
            .subscribe((respose: any) => {
                console.log('dgdfgd', respose);
                this.businessStatsData = respose.data.businessStats;
                this.deliveriesStatsData = respose.data.deliveriesStats;
                this.patientStatsData = respose.data.patientStats;
                this.plantsStatsData = respose.data.plantsStats;
                this.productsStatsData = respose.data.productsStats;

                this.businessStatsId = [];
                this.businessStatsCount = [];

                this.businessStatsData.rangeStats.forEach((element) => {
                    this.businessStatsId.push(element._id);
                    this.businessStatsCount.push(element.count);
                });
                this.businessStatsChartoption(
                    this.businessStatsCount,
                    this.businessStatsId
                );

                this.deliveriesStatsId = [];
                this.deliveriesStatsCount = [];

                this.deliveriesStatsData.deliveries.forEach((element) => {
                    this.deliveriesStatsId.push(element._id);
                    this.deliveriesStatsCount.push(element.count);
                });
                this.deliveriesStatsChartoption(
                    this.deliveriesStatsCount,
                    this.deliveriesStatsId
                );

                this.productsStatsId = [];
                this.productsStatsCount = [];

                this.productsStatsData.rangeStats.forEach((element) => {
                    this.productsStatsId.push(element._id);
                    this.productsStatsCount.push(element.count);
                });
                this.productsStatsChartoption(
                    this.productsStatsCount,
                    this.productsStatsId
                );

                this.plantsStatsId = [];
                this.plantsStatsCount = [];

                this.plantsStatsData.rangeStats.forEach((element) => {
                    this.plantsStatsId.push(element._id);
                    this.plantsStatsCount.push(element.count);
                });
                this.plantsStatsChartoption(
                    this.plantsStatsCount,
                    this.plantsStatsId
                );

                this.patientStatsData.rangeStats.forEach((element) => {
                    this.patientStatsId.push(element._id);
                    this.patientStatsCount.push(element.count);
                });

                this.patientStatsChartoption(
                    this.patientStatsCount,
                    this.patientStatsId
                );
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
        this.businessStatsOptions = {
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

    deliveriesStatsChartoption(series: number[], labels): void {
        this.deliveriesStatsOptions = {
            series: [
                {
                    name: 'Deliveries',
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
    productsStatsChartoption(series: number[], labels): void {
        this.productsStatsOptions = {
            series: [
                {
                    name: 'Products',
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
                    columnWidth: '95%',
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
    plantsStatsChartoption(series: number[], labels): void {
        this.plantsStatsOptions = {
            series: [
                {
                    name: 'Plants',
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
                    columnWidth: '95%',
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
    patientStatsChartoption(series: number[], labels): void {
        this.patientStatsOptions = {
            series: [
                {
                    name: 'Patient',
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
                    columnWidth: '95%',
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
