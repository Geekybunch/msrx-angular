import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import { adminUrls } from '../urls';

@Injectable({
    providedIn: 'root',
})
export class StateAgenciesService {
    constructor(private http: HttpClient, private authService: AuthService) {}

    getStateAgencies(pageparams: any) {
        return this.http.get<any>(adminUrls.stateAgencies + pageparams);
    }
    postStateAgencies(data: any) {
        return this.http.post<any>(adminUrls.stateAgencies, data);
    }
    resetPasswordStateAgencies(id: any) {
        return this.http.post<any>(
            adminUrls.stateAgencies + '/' + id + '/reset-password',
            ''
        );
    }
    deleteStateAgencies(id: any) {
        return this.http.delete<any>(adminUrls.stateAgencies + '/' + id);
    }
}
