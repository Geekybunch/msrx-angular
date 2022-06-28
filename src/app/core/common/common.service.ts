/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filterNullValue } from 'app/shared/shared.utils';
import { Subject } from 'rxjs';
import { DispensaryProfileResponse } from '../dispensary/dispensary.interface';
import { applicationUrls } from '../urls';
import {
    CityJSONFile,
    GetBookingResponse,
    GetPrescriptionResponse,
    GetWellnessProfileResponse,
    SearchDispensaryResponse,
    SearchWellnessProfileResponse,
    WellnessCenterSlotsResponse,
} from '../wellness/wellness.interface';
import {
    BookFilterI,
    CommonBusinessResponse,
    CommonPLantDetailResponse,
    CommonProductDetailI,
    DispensariesListResponse,
} from './common.interface';

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    $testPantID = new Subject();

    private cityDetailsMap = new Map<string, string[]>();

    constructor(private http: HttpClient) {
        this.loadStateFile().subscribe((res) => {
            this.cityDetailsMap = new Map(Object.entries(res));
        });
    }

    getCommonPlantDetails(plantID: string) {
        return this.http.get<CommonPLantDetailResponse>(
            applicationUrls.commonPlantDetails + '/' + plantID
        );
    }
    getCommonProductDetails(plantID: string) {
        return this.http.get<CommonProductDetailI>(
            applicationUrls.commonProductDetails + '/' + plantID
        );
    }
    getBusinessListing(businessName?: string) {
        return this.http.get<CommonBusinessResponse>(
            applicationUrls.commonListBusinesses,
            {
                params: {
                    businessName,
                } as any,
            }
        );
    }
    listDispensaryList() {
        return this.http.get<DispensariesListResponse>(
            applicationUrls.commonListDispensary
        );
    }
    searchWellnessCenter(req: BookFilterI, page?: number) {
        const parsedReq = filterNullValue(req) || {};

        if (page) {
            parsedReq['page'] = page;
        }

        return this.http.get<SearchWellnessProfileResponse>(
            applicationUrls.searchWellnesscenter,
            {
                params: parsedReq as any,
            }
        );
    }

    getWellnessCenter(id: string) {
        return this.http.get<GetWellnessProfileResponse>(
            applicationUrls.searchWellnesscenter + '/' + id
        );
    }

    getDispensary(id: string) {
        return this.http.get<DispensaryProfileResponse>(
            applicationUrls.searchDispensaries + '/' + id
        );
    }

    searchDispensary(req: BookFilterI) {
        return this.http.get<SearchDispensaryResponse>(
            applicationUrls.searchDispensaries,
            {
                params: filterNullValue(req) as any,
            }
        );
    }

    getPrescription(bookingID: string) {
        return this.http.get<GetPrescriptionResponse>(
            applicationUrls.getBookingPrescription.replace(
                '{{centreId}}',
                bookingID
            )
        );
    }

    getValidPrescription(patientID: string) {
        return this.http.get<GetPrescriptionResponse>(
            applicationUrls.commonValidPrescription.replace(
                '{{patientID}}',
                patientID
            )
        );
    }
    loadStateFile() {
        return this.http.get<CityJSONFile>('/assets/states.json');
    }

    getState() {
        return new Promise<string[]>((res, rej) => {
            if (this.cityDetailsMap.size) {
                res(Array.from(this.cityDetailsMap.keys()));
            } else {
                this.loadStateFile().subscribe(() => {
                    res(Array.from(this.cityDetailsMap.keys()));
                });
            }
        });
    }

    getCitiesByState(stateName: string) {
        return new Promise<string[]>((res, rej) => {
            if (this.cityDetailsMap.size) {
                res(this.cityDetailsMap.get(stateName) || []);
            } else {
                this.loadStateFile().subscribe(() => {
                    res(this.cityDetailsMap.get(stateName) || []);
                });
            }
        });
    }

    getWellnessCenterSlots(wellnessCenterID: string, date: string) {
        return this.http.get<WellnessCenterSlotsResponse>(
            applicationUrls.wellnessCenterSlots.replace(
                '{{wellnessCenter}}',
                wellnessCenterID
            ),
            {
                params: {
                    date,
                },
            }
        );
    }

    getBooking(bookingID: string) {
        return this.http.get<GetBookingResponse>(
            applicationUrls.getBooking.replace('{{bookingID}}', bookingID)
        );
    }

    async getPrescriptionCard(bookingID: string) {
        const res = await fetch(
            applicationUrls.prescriptionCard + '/' + bookingID
        );
        const blob = await res.blob();

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener(
                'load',
                () => {
                    resolve(reader.result);
                },
                false
            );

            reader.onerror = () => reject(this);
            reader.readAsDataURL(blob);
        });
        // return this.http.get<GetBookingResponse>(applicationUrls.prescriptionCard + '/' + bookingID);
    }
}
