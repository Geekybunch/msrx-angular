import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { applicationUrls } from '../urls';

import {
    CreateVehicleRequest,
    DeliveryVehicleI,
    VehicleListResponse,
} from './delivery-vehicle.interface';

@Injectable({
    providedIn: 'root',
})
export class DileveryVehicleService {
    constructor(private http: HttpClient) {}

    saveVehicle(req: CreateVehicleRequest) {
        return this.http.post(applicationUrls.delieryVehicle, req);
    }

    listVehicles(payload: any) {
        return this.http.get<VehicleListResponse>(
            applicationUrls.delieryVehicle + payload
        );
    }

    deleteVehicle(id: string) {
        return this.http.delete(applicationUrls.delieryVehicle + '/' + id);
    }

    updateVehicles(id: string, item: CreateVehicleRequest) {
        return this.http.put(applicationUrls.delieryVehicle + '/' + id, item);
    }
}
