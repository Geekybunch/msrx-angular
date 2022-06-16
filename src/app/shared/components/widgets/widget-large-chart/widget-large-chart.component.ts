import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexStroke,
    ApexMarkers,
    ApexYAxis,
    ApexGrid,
    ApexTitleSubtitle,
    ApexLegend,
} from 'ng-apexcharts';
import moment from 'moment';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    markers: ApexMarkers;
    tooltip: any; // ApexTooltip;
    yaxis: ApexYAxis;
    grid: ApexGrid;
    legend: ApexLegend;
    title: ApexTitleSubtitle;
};
@Component({
    selector: 'app-widget-large-chart',
    templateUrl: './widget-large-chart.component.html',
    styleUrls: ['./widget-large-chart.component.scss'],
})
export class WidgetLargeChartComponent implements OnInit {
    @Input() seriesRaw = [];
    categories: any = [];
    series = [];
    @ViewChild('chart', { static: false }) chart: ChartComponent;
    isChartLoading = true;
    @Input() startDate: any;
    @Input() endDate: any;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: this.series,
            chart: {
                toolbar: {
                    show: false,
                },
                height: 350,
                type: 'line',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 5,
                curve: 'smooth',
                dashArray: [0, 8, 5],
            },
            title: {
                align: 'left',
            },
            legend: {
                tooltipHoverFormatter(val, opts) {
                    return (
                        val +
                        ' - <strong>' +
                        opts.w.globals.series[opts.seriesIndex][
                            opts.dataPointIndex
                        ] +
                        '</strong>'
                    );
                },
            },
            markers: {
                size: 0,
                hover: {
                    sizeOffset: 6,
                },
            },
            yaxis: {
                labels: {
                    formatter: function (val) {
                        return val.toFixed(0);
                    },
                },
            },
            xaxis: {
                labels: {
                    trim: false,
                },
                categories: this.categories,
            },
            grid: {
                borderColor: '#f1f1f1',
            },
        };
    }

    ngOnChanges() {
        console.log('here');
        const startDate = this.startDate;
        const endDate = this.endDate;
        this.categories = this.getDaysBetweenDates(startDate, endDate);
        this.series = this.getSeriesFromRawData();
        this.isChartLoading = false;
        this.chartOptions.series = this.series;
        this.chartOptions.xaxis.categories = this.categories;

        this.chartOptions = {
            series: this.series,
            chart: {
                toolbar: {
                    show: false,
                },
                height: 350,
                type: 'line',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 5,
                curve: 'smooth',
                dashArray: [0, 8, 5],
            },
            title: {
                align: 'left',
            },
            legend: {
                tooltipHoverFormatter(val, opts) {
                    return (
                        val +
                        ' - <strong>' +
                        opts.w.globals.series[opts.seriesIndex][
                            opts.dataPointIndex
                        ] +
                        '</strong>'
                    );
                },
            },
            markers: {
                size: 0,
                hover: {
                    sizeOffset: 6,
                },
            },
            yaxis: {
                labels: {
                    formatter: function (val) {
                        return val.toFixed(0);
                    },
                },
            },
            xaxis: {
                labels: {
                    trim: false,
                },
                categories: this.categories,
            },
            grid: {
                borderColor: '#f1f1f1',
            },
        };
    }

    getDaysArray(start, end) {
        for (
            var arr = [], dt = new Date(start);
            dt <= new Date(end);
            dt.setDate(dt.getDate() + 1)
        ) {
            arr.push(new Date(dt));
        }
        return arr;
    }

    getDaysBetweenDates = function (startDate, endDate) {
        var dateArray = [];
        var currentDate = moment(startDate);
        var stopDate = moment(endDate);
        while (currentDate <= stopDate) {
            dateArray.push(moment(currentDate).format('YYYY-MM-DD'));
            currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
    };

    getSeriesFromRawData = () => {
        for (let i = 0; i < this.seriesRaw.length; i++) {
            const data = this.seriesRaw[i].data;
            const newData = [];
            for (let j = 0; j < this.categories.length; j++) {
                // console.log('matching', data, this.categories[j]);
                const found = data.find((o) => o._id === this.categories[j]);
                if (found) {
                    newData.push(found.count);
                } else {
                    newData.push(0);
                }
            }

            this.seriesRaw[i].data = newData;
        }

        return this.seriesRaw;
    };

    ngOnInit() {
        setTimeout(() => {}, 1000);
    }
}
