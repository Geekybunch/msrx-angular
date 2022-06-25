import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { applicationUrls } from '../urls';

import {
    BookingListResponse,
    CreateBookingI,
    GetWellnessSlotsResponse,
} from './booking.interfaces';

@Injectable({
    providedIn: 'root',
})
export class BookingService {
    constructor(private http: HttpClient) {}

    createPatientBooking(data: CreateBookingI) {
        const url = applicationUrls.patientBooking;
        return this.http.post(url, data);
    }

    getWellnessBooking(payload: any) {
        const url = applicationUrls.wellnessBookingCenter;
        return this.http.get<BookingListResponse>(url + payload);
    }

    getWellnessBookingSlots(date?: string) {
        const url = applicationUrls.wellnessBookingCenterSlots;
        return this.http.get<GetWellnessSlotsResponse>(url, {
            params: {
                date,
            } as any,
        });
    }

    getPatientBookings(pageNumber = 1) {
        const url = applicationUrls.patientBooking;
        return this.http.get<BookingListResponse>(url, {
            params: {
                page: pageNumber,
            },
        });
    }
}
