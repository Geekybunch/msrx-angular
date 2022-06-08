import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { cultivatorUrls } from '../urls';
import { AuthService } from 'app/core/auth/auth.service';
import { CreatePlantRequest } from './grower.interface';

@Injectable({
    providedIn: 'root',
})
export class GrowerService {
    constructor(private http: HttpClient, private authService: AuthService) {}

    getplantsDetails(payload: any) {
        return this.http.get<any>(cultivatorUrls.plants + payload);
    }
    createGrowerPlant(request: CreatePlantRequest) {
        return this.http.post(cultivatorUrls.plants, request);
    }
}
