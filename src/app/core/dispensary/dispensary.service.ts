import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { applicationUrls } from '../urls';

import {
    AddDispensaryDetails,
    DispensaryDashboardResponse,
    DispensaryProfileResponse,
    DosageHistoryResponse,
    GiveDosageRequest,
} from './dispensary.interface';

@Injectable({
    providedIn: 'root',
})
export class DispensaryService {
    constructor(private http: HttpClient) {}

    getDashboardData(payload: any) {
        return this.http.get<DispensaryDashboardResponse>(
            applicationUrls.dispensaryDashboard + payload
        );
    }

    saveDosage(prescriptionID: string, request: GiveDosageRequest) {
        return this.http.put(
            applicationUrls.dispensaryDosage + '/' + prescriptionID,
            request
        );
    }

    getDisposerProfileData() {
        return this.http.get<DispensaryProfileResponse>(
            applicationUrls.dispensaryProfile
        );
    }

    saveDisposerProfileData(request: AddDispensaryDetails) {
        return this.http.put<DispensaryProfileResponse>(
            applicationUrls.dispensaryProfile,
            request
        );
    }

    getSoldDosages(payload: any) {
        return this.http.get<DosageHistoryResponse>(
            applicationUrls.dispensaryDosageList + payload
        );
    }
}
