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

    getDashboardData(from: string, to: string) {
        return this.http.get<DispensaryDashboardResponse>(
            applicationUrls.dispensaryDashboard,
            {
                params: {
                    // from,
                    // to
                } as any,
            }
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

    getSoldDosages() {
        return this.http.get<DosageHistoryResponse>(
            applicationUrls.dispensaryDosageList
        );
    }
}
