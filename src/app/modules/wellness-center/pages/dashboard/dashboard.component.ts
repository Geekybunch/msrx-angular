import { Component, OnInit } from '@angular/core';
import { SlotCountI } from 'app/core/booking/booking.interfaces';
import { BookingService } from 'app/core/booking/booking.service';
import { WellnessStatusI } from 'app/core/wellness/wellness.interface';
import { WellnessService } from 'app/core/wellness/wellness.service';
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
    public state1;
    public state3;
    public state2;
    stats: WellnessStatusI;
    pie1Filter = 'today';
    pie2Filter = 'today';
    slotData: SlotCountI[] = [];
    constructor(
        private bookingService: BookingService,
        private wellnessService: WellnessService
    ) {
        this.userDetails = JSON.parse(localStorage.getItem('userData'));
    }

    ngOnInit(): void {
        this.getBookingCounts();
        this.getBookingSlots();
    }
    getBookingCounts() {
        this.wellnessService.getWellnessCenterCount().subscribe((res) => {
            console.log(res);
            this.stats = res.data;
        });
    }
    getPie1() {
        if (!this.stats) {
            return 0;
        }

        switch (this.pie1Filter) {
            case 'month':
                return this.stats.monthPending;
            case 'today':
                return this.stats.todayPending;
            case 'week':
                return this.stats.weekPending;

            default:
                return 0;
        }
    }

    getPie2() {
        if (!this.stats) {
            return 0;
        }

        switch (this.pie2Filter) {
            case 'month':
                return this.stats.monthTotal;
            case 'today':
                return this.stats.todayTotal;
            case 'week':
                return this.stats.weekTotal;

            default:
                return 0;
        }
    }
    getBookingSlots(date?: moment.Moment) {
        let dateStr: string;
        if (date) {
            dateStr = date.format('YYYY-MM-DD');
        } else {
            dateStr = moment().format('YYYY-MM-DD');
        }
        this.slotData = [];
        this.bookingService
            .getWellnessBookingSlots(dateStr)
            .subscribe((res) => {
                console.log(res);
                this.slotData = res.data.slotCounts;
            });
    }

    filterByStartDate(event) {
        // this.startDate = new DatePipe('en-US').transform(
        //     event.value,
        //     'yyyy-MM-dd'
        // );
        // this.dateFrom = this.startDate;
        // this.getDashboardData(this.startDate, null);
    }
    filterByEndDate(event) {
        // this.endDate = new DatePipe('en-US').transform(
        //     event.value,
        //     'yyyy-MM-dd'
        // );
        // this.dateTo = this.endDate;
        // this.getDashboardData(this.startDate, this.endDate);
    }
    changeSelected(event) {}
}
