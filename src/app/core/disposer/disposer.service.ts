import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { applicationUrls } from '../urls';

@Injectable({
    providedIn: 'root',
})
export class DisposerService {
    constructor(private http: HttpClient) {}

    getDisposerDashboardData(payload: any) {
        return this.http.get(applicationUrls.distributorDashboard + payload);
    }
}
