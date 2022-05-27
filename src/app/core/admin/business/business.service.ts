import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { adminUrls } from '../urls';
import { AuthService } from 'app/core/auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class BusinessService {
    constructor(private http: HttpClient, private authService: AuthService) {}

    getBusinessDetails(payload: any) {
        return this.http.get<any>(adminUrls.businesses + payload);
    }
    changeBusinessStatus(id: number, data: any) {
        return this.http.put<any>(
            adminUrls.businesses + '/' + id + '/approval',
            data
        );
    }
    deleteBusiness(id: number) {
        return this.http.delete<any>(adminUrls.businesses + '/' + id);
    }
}
