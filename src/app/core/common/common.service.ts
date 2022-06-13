/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { applicationUrls } from '../urls';
import { CommonPLantDetailResponse } from './common.interface';

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    constructor(private http: HttpClient) {}

    getCommonPlantDetails(plantID: string) {
        return this.http.get<CommonPLantDetailResponse>(
            applicationUrls.commonPlantDetails + '/' + plantID
        );
    }
}
