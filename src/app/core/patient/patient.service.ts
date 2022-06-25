import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { applicationUrls } from '../urls';

import { PatientDashboardResponseI } from './patient.interface';

@Injectable({
    providedIn: 'root',
})
export class PatientService {
    constructor(private http: HttpClient) {}

    getDashboardData(from: string, to: string) {
        return this.http.get<PatientDashboardResponseI>(
            applicationUrls.patientDashboard,
            {
                params: {
                    from,
                    to,
                } as any,
            }
        );
    }

    addWellnessReview(bookingID: string, review: string, rating: number) {
        return this.http.post<PatientDashboardResponseI>(
            applicationUrls.rateWellnessCenter.replace(
                '{{bookingId}}',
                bookingID
            ),
            {
                review,
                rating,
            }
        );
    }
}
