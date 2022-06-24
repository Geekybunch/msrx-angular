/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ProductI } from '../common/common.interface';
import { applicationUrls } from '../urls';
import {
    AddQuantityInventoryI,
    InventoryDetailsResponse,
    InventoryLogResponse,
} from './inventory.interface';

@Injectable({
    providedIn: 'root',
})
export class InventoryService {
    constructor(private http: HttpClient) {}

    getInventoryDetails(payload: any) {
        return this.http.get<InventoryDetailsResponse>(
            applicationUrls.inventoryDetails + payload
        );
    }

    getInventoryLogs(payload: any) {
        return this.http.get<InventoryLogResponse>(
            applicationUrls.inventoryLogs + payload
            // {
            //     params: {
            //         page,
            //     },
            // }
        );
    }

    addQuantity(request: AddQuantityInventoryI) {
        return this.http.post<any>(
            applicationUrls.addManufacturerInventory,
            request
        );
    }
}
