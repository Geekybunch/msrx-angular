import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DEFAULT_POPULATED_FIELDS } from 'app/shared/shared.enums';
import { applicationUrls } from '../urls';

import {
    GetTestResult,
    SaveTestResult,
    TesterStatsResponse,
    TestListResponse,
} from './tester.interface';

@Injectable({
    providedIn: 'root',
})
export class TesterService {
    constructor(private http: HttpClient) {}

    getSavedTest(plantID: string) {
        return this.http.get<GetTestResult>(
            applicationUrls.plantTestResult.replace('{{plantId}}', plantID)
        );
    }

    saveTestResult(plantID: string, request: SaveTestResult) {
        const fd = new FormData();

        Object.keys(request).forEach((k) => {
            fd.append(k, request[k]);
        });

        return this.http.post(
            applicationUrls.plantTestResult.replace('{{plantId}}', plantID),
            fd
        );
    }

    getTestResultList(payload: any) {
        return this.http.get<any>(applicationUrls.plantTest + payload, {
            params: {
                populate: DEFAULT_POPULATED_FIELDS.join(),
            },
        });
    }

    getDashboardData(payload: any) {
        return this.http.get<any>(applicationUrls.testerDashboard + payload);
    }
}
