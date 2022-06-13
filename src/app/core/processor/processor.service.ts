import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DEFAULT_POPULATED_FIELDS } from 'app/shared/shared.enums';
import { applicationUrls } from '../urls';

import {
    CreateProccessResultRequest,
    GetProcessResult,
    ProcessedListResponse,
    ProcessorDashboardResponse,
} from './processor.interface';

@Injectable({
    providedIn: 'root',
})
export class ProcessorService {
    constructor(private http: HttpClient) {}

    getSavedTest(plantID: string) {
        return this.http.get<GetProcessResult>(
            applicationUrls.plantProcessResult.replace('{{plantId}}', plantID)
        );
    }

    saveProcessTestResult(
        plantID: string,
        request: CreateProccessResultRequest
    ) {
        return this.http.post(
            applicationUrls.plantProcessResult.replace('{{plantId}}', plantID),
            request
        );
    }

    getTestResultList(payload: any) {
        return this.http.get<any>(
            applicationUrls.plantProcessResultList + payload,
            {
                params: {
                    populate: DEFAULT_POPULATED_FIELDS.join(),
                },
            }
        );
    }

    getDashboardData(payload: any) {
        return this.http.get<ProcessorDashboardResponse>(
            applicationUrls.processorDashboard + payload
        );
    }
}
