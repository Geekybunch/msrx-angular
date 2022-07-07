import { Component, OnInit } from '@angular/core';
import { CalendarView } from 'angular-calendar';
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
    weekArray: moment.Moment[] = [];
    weekOffset = 0;
    view: CalendarView = CalendarView.Month;
    viewDate: Date = new Date();
    constructor(
        private bookingService: BookingService,
        private wellnessService: WellnessService
    ) {
        this.userDetails = JSON.parse(localStorage.getItem('userData'));
    }

    ngOnInit(): void {
        this.calculateActiveWeek();
        this.getBookingCounts();
    }
    updateWeekOffset(offset: number) {
        this.weekOffset += offset;
        this.calculateActiveWeek();
    }

    calculateActiveWeek() {
        this.weekArray = [];
        const thisWeekMax = moment().add(1, 'week');
        let iterator = moment();

        this.weekArray.push(iterator);

        while (iterator.isBefore(thisWeekMax)) {
            iterator = iterator.clone().add(1, 'day');
            this.weekArray.push(iterator);
        }

        this.weekArray.pop();
        this.getBookingSlots();
    }

    getBookingCounts() {
        this.wellnessService.getWellnessCenterCount().subscribe((res) => {
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
                this.slotData = res.data.slotCounts;
            });
    }

    getWeekRangeLabel() {
        if (!this.weekArray.length) {
            return '--';
        }

        const first = this.weekArray[0];
        const last = this.weekArray[this.weekArray.length - 1];

        let stringValue = `${first.date()}`;

        if (first.month() !== last.month()) {
            stringValue += ` ${first.month()}`;
        }

        stringValue += ` - ${last.date()} ${last.format('MMM')} ${last.year()}`;

        return stringValue;
    }

    getBookingChipClass(count: number) {
        if (count > 10) {
            return 'booked-3';
        } else if (count > 5) {
            return 'booked-2';
        } else if (count > 1) {
            return 'booked-1';
        } else {
            return 'available';
        }
    }
}
