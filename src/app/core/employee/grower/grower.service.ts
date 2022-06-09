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
        return this.http.get<any>(cultivatorUrls.growerPlants + payload);
    }
    createGrowerPlant(request: CreatePlantRequest) {
        return this.http.post(cultivatorUrls.growerPlants, request);
    }
    updatePlant(id: string, request: CreatePlantRequest) {
        return this.http.put(cultivatorUrls.growerPlants + '/' + id, request);
    }
    deleteGrowerPlant(id: string) {
        return this.http.delete(cultivatorUrls.growerPlants + '/' + id);
    }
}
