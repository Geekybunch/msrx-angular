import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';

import { GrowerService } from 'app/core/grower/grower.service';
import { ProcessorService } from 'app/core/processor/processor.service';
import { TesterService } from 'app/core/tester/tester.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    public userDetails: any;
    public startDate;
    public endDate;
    public currentMonth: any;
    dashboardLoaded = false;
    materialType = 'Plants';
    userInfo: any;
    public grownPlantCount: number;
    public testedPlantCount: number;
    public plantTestedCount: number;
    public plantProcessed: number;

    userSessionsSeries: ApexAxisChartSeries = [];
    cardCount: {
        label: string;
        value: number;
    }[] = [];

    constructor(
        private growerService: GrowerService,
        private testerService: TesterService,
        private processorService: ProcessorService,
        private authServies: AuthService
    ) {
        this.userInfo = JSON.parse(localStorage.getItem('userData'));
    }

    ngOnInit(): void {
        this.getDates();
        this.userDetails = JSON.parse(localStorage.getItem('userData'));
        this.getDashboardData();
    }
    countTimer(index: number, maxVal: number) {
        const timer1 = setInterval(() => {
            if (this.cardCount[index].value === maxVal) {
                clearInterval(timer1);
            } else {
                this.cardCount[index].value++;
            }
        }, 200);
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
                        console.log(res);
                        this.grownPlantCount = res.data.plantCount;
                        this.testedPlantCount = res.data.plantTestedCount;
                        this.cardCount.push({
                            label: 'Grown',
                            value: 0,
                        });

                        this.countTimer(0, res.data.plantCount);

                        this.cardCount.push({
                            label: 'Tested',
                            value: 0,
                        });

                        this.countTimer(1, res.data.plantTestedCount);
                        this.userSessionsSeries = [
                            { name: 'Tested', data: res.data.plantsTested },
                            { name: 'Grown', data: res.data.plantsAdded },
                            {
                                name: 'Processed',
                                data: res.data.plantsProcessed,
                            },
                        ];
                        this.dashboardLoaded = true;
                    });
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
                        this.plantTestedCount = res.data.plantTestedCount;

                        this.countTimer(0, res.data.plantTestedCount);

                        this.cardCount.push({
                            label: 'Tested',
                            value: 0,
                        });

                        this.countTimer(1, res.data.plantTestedCount);
                        this.userSessionsSeries = [
                            { name: 'Tested', data: res.data.plantsTested },
                        ];
                        this.dashboardLoaded = true;
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
                        this.plantProcessed = res.data.plantProcessedCount;

                        this.countTimer(0, res.data.plantTestedCount);

                        this.cardCount.push({
                            label: 'Processor',
                            value: 0,
                        });

                        this.countTimer(1, res.data.plantTestedCount);
                        this.userSessionsSeries = [
                            {
                                name: 'Processor',
                                data: res.data.plantProcessed,
                            },
                        ];
                        this.dashboardLoaded = true;
                    });
            }
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
}
