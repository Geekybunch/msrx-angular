import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { applicationUrls } from '../urls';
import {
    CreatePlantRequest,
    GrowerDashboardResponse,
    GrowerListResponse,
} from './grower.interface';

@Injectable({
    providedIn: 'root',
})
export class GrowerService {
    constructor(private http: HttpClient) {}

    getGrowerPlants(payload: any) {
        return this.http.get<any>(applicationUrls.growerPlants + payload);
    }

    createGrowerPlant(request: CreatePlantRequest) {
        return this.http.post(applicationUrls.growerPlants, request);
    }

    deleteGrowerPlant(id: string) {
        return this.http.delete(applicationUrls.growerPlants + '/' + id);
    }

    updatePlant(id: string, request: CreatePlantRequest) {
        return this.http.put(applicationUrls.growerPlants + '/' + id, request);
    }

    getDashboardData(payload: any) {
        return this.http.get<any>(applicationUrls.growerDashboard + payload);
    }
}
