/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { applicationUrls } from '../urls';
import {
    CommonBusinessResponse,
    CommonPLantDetailResponse,
} from './common.interface';

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    $testPantID = new Subject();

    constructor(private http: HttpClient) {}

    getCommonPlantDetails(plantID: string) {
        return this.http.get<CommonPLantDetailResponse>(
            applicationUrls.commonPlantDetails + '/' + plantID
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
}
