import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { adminUrls } from '../urls';
import { AuthService } from 'app/core/auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class DeliveriesService {
    constructor(private http: HttpClient, private authService: AuthService) {}

    getDeliveriesList(payload: any) {
        return this.http.get<any>(adminUrls.deliveries + payload);
    }
}
