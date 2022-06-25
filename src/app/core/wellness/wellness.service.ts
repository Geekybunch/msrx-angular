/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    AddWelnessDetails,
    GetPrescriptionResponse,
    GetWellnessProfileResponse,
    WellnessCenterStatResponse,
} from './wellness.interface';
import { BOOKIN_STATUS } from './bookin.enums';
import { BookFilterI } from '../common/common.interface';
import { applicationUrls } from '../urls';

@Injectable({
    providedIn: 'root',
})
export class WellnessService {
    constructor(private http: HttpClient) {}

    searchWellnessCenter(query: BookFilterI) {
        return this.http.get(applicationUrls.wellnessCenterProfile, {
            params: query as any,
        });
    }

    saveWellnessCenterProfile(data: AddWelnessDetails) {
        return this.http.post(applicationUrls.wellnessCenterProfile, data);
    }

    updateWellnessCenterProfile(data: AddWelnessDetails) {
        return this.http.put(applicationUrls.wellnessCenterProfile, data);
    }

    getWellnessCenterProfile() {
        return this.http.get<GetWellnessProfileResponse>(
            applicationUrls.wellnessCenterProfile
        );
    }

    updateBookingStatus(
        bookingID: string,
        status: BOOKIN_STATUS,
        statusReason: string = null
    ) {
        const req = {
            status,
        };

        if (statusReason) {
            req['statusReason'] = statusReason;
        }
        return this.http.put<GetWellnessProfileResponse>(
            applicationUrls.wellnessBookingUpdate.replace(
                '{{centreId}}',
                bookingID
            ),
            req
        );
    }

    markPatientVisited(
        bookingID: string,
        status: BOOKIN_STATUS,
        patientVisitedTime: Date
    ) {
        const req = {
            patientVisitedTime,
            status,
        };
        return this.http.put<GetWellnessProfileResponse>(
            applicationUrls.wellnessBookingUpdate.replace(
                '{{centreId}}',
                bookingID
            ),
            req
        );
    }

    getWellnessCenterCount() {
        return this.http.get<WellnessCenterStatResponse>(
            applicationUrls.wellnessCenterCount
        );
    }

    savePrescription(bookingID: string, request) {
        return this.http.post(
            applicationUrls.wellnessBookingPrescription.replace(
                '{{centreId}}',
                bookingID
            ),
            request
        );
    }

    signPrescription(bookingID: string) {
        return this.http.get<GetPrescriptionResponse>(
            applicationUrls.signWellnessBookingPrescription.replace(
                '{{centreId}}',
                bookingID
            )
        );
    }
}
