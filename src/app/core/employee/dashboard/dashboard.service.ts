import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cultivatorUrls } from '../urls';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    constructor(private http: HttpClient) {}

    getDashboardData(payload: any) {
        // let options = payload ? payload : '';
        return this.http.get<any>(cultivatorUrls.dashboard + payload);
    }
}
