import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DisposerService } from 'app/core/disposer/disposer.service';
import { GrowerService } from 'app/core/grower/grower.service';
import { ManufactureService } from 'app/core/manufacture/manufacture.service';
import { ProcessorService } from 'app/core/processor/processor.service';
import { TesterService } from 'app/core/tester/tester.service';
import moment from 'moment';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    public userDetails: any;
    public startDate: string;
    public endDate: string;
    public dateFrom: any;
    public dateTo: any;
    public currentMonth: any;
    dashboardLoaded = false;
    materialType = 'Plants';
    userInfo: any;
    public analyticsData: any;

    userSessionsSeries: ApexAxisChartSeries = [];
    cardCount: {
        label: string;
        value: number;
    }[] = [];

    constructor(
        private growerService: GrowerService,
        private testerService: TesterService,
        private processorService: ProcessorService,
        private manufactureService: ManufactureService,
        private disposerService: DisposerService
    ) {
        this.userInfo = JSON.parse(localStorage.getItem('userData'));
    }

    ngOnInit(): void {
        this.getDates();
        this.userDetails = JSON.parse(localStorage.getItem('userData'));
        this.getDashboardData();
    }

    getDates() {
        // this.dateFrom = moment().subtract(1, 'month');
        // this.dateTo = moment();

        let d = new Date();
        this.endDate = new DatePipe('en-US').transform(
            d.toLocaleDateString(),
            'yyyy-MM-dd'
        );
        this.dateTo = this.endDate;

        d.setMonth(d.getMonth() - 1);
        this.startDate = new DatePipe('en-US').transform(
            d.toLocaleDateString(),
            'yyyy-MM-dd'
        );
        this.dateFrom = this.startDate;
    }

    getDashboardData(start?: string, end?: string) {
        if (this.userInfo.modelId.employer.businessType === 'Cultivator') {
            let params: any;
            if (start && !end) {
            } else {
                if (start && end) {
                    params = `?from=${start}&to=${end}`;
                } else {
                    params = `?from=${this.startDate}&to=${this.endDate}`;
                }
                this.growerService
                    .getDashboardData(params)
                    .subscribe((res: any) => {
                        console.log('data', res);
                        this.analyticsData = res.data;

                        this.userSessionsSeries = [
                            { name: 'Tested', data: res.data.plantsTested },
                            { name: 'Grown', data: res.data.plantsAdded },
                            {
                                name: 'Processed',
                                data: res.data.plantsProcessed,
                            },
                        ];
                    });
                console.log('this.userSessionsSeries', this.userSessionsSeries);
            }
        } else if (this.userInfo.modelId.employer.businessType === 'Tester') {
            let params: any;
            if (start && !end) {
            } else {
                if (start && end) {
                    params = `?from=${start}&to=${end}`;
                } else {
                    params = `?from=${this.startDate}&to=${this.endDate}`;
                }
                this.testerService
                    .getDashboardData(params)
                    .subscribe((res: any) => {
                        console.log(res);
                        this.analyticsData = res.data;
                        this.userSessionsSeries = [
                            { name: 'Tested', data: res.data.plantsTested },
                        ];
                    });
            }
        } else if (
            this.userInfo.modelId.employer.businessType === 'Processor'
        ) {
            let params: any;
            if (start && !end) {
            } else {
                if (start && end) {
                    params = `?from=${start}&to=${end}`;
                } else {
                    params = `?from=${this.startDate}&to=${this.endDate}`;
                }
                this.processorService
                    .getDashboardData(params)
                    .subscribe((res: any) => {
                        console.log(res);
                        this.analyticsData = res.data;

                        this.userSessionsSeries = [
                            {
                                name: 'Processor',
                                data: res.data.plantProcessed,
                            },
                        ];
                    });
            }
        } else if (
            this.userInfo.modelId.employer.businessType === 'Manufacturer'
        ) {
            let params: any;
            if (start && !end) {
            } else {
                if (start && end) {
                    params = `?from=${start}&to=${end}`;
                } else {
                    params = `?from=${this.startDate}&to=${this.endDate}`;
                }
                this.manufactureService
                    .getDashboardData(params)
                    .subscribe((res: any) => {
                        this.analyticsData = res.data;
                        this.materialType = 'Product';
                        this.userSessionsSeries = [
                            {
                                name: 'Manufactured',
                                data: res.data.productsAdded,
                            },
                            {
                                name: 'Sent',
                                data: res.data.deliveriesDone,
                            },
                        ];
                    });
            }
        } else if (this.userInfo.modelId.employer.businessType === 'Disposer') {
            let params: any;
            if (start && !end) {
            } else {
                if (start && end) {
                    params = `?from=${start}&to=${end}`;
                } else {
                    params = `?from=${this.startDate}&to=${this.endDate}`;
                }
                this.disposerService
                    .getDisposerDashboardData(params)
                    .subscribe((res: any) => {
                        this.analyticsData = res.data;
                        console.log(res);

                        this.userSessionsSeries = [
                            {
                                name: 'Manufactured',
                                data: res.data.deliveryDone,
                            },
                        ];
                    });
            }
        }
    }
    filterByStartDate(event) {
        this.startDate = new DatePipe('en-US').transform(
            event.value,
            'yyyy-MM-dd'
        );
        this.dateFrom = this.startDate;
        this.getDashboardData(this.startDate, null);
    }
    filterByEndDate(event) {
        this.endDate = new DatePipe('en-US').transform(
            event.value,
            'yyyy-MM-dd'
        );
        this.dateTo = this.endDate;
        this.getDashboardData(this.startDate, this.endDate);
    }
}
