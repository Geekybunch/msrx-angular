import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { applicationUrls } from '../urls';

import {
    CreateDileveryI,
    DeliveriesResponseI,
    DeliveryDashboardResponse,
} from './distributer.interface';

@Injectable({
    providedIn: 'root',
})
export class DistributerService {
    constructor(private http: HttpClient) {}

    addDelivery(data: CreateDileveryI) {
        return this.http.post(applicationUrls.deliveryURL, data);
    }

    deleteDelivery(id: string) {
        return this.http.delete(applicationUrls.deliveryURL + '/' + id);
    }

    listDeliveries(payload: any) {
        return this.http.get<DeliveriesResponseI>(
            applicationUrls.deliveryURL + payload,
            {
                params: {
                    populate: 'from, to',
                },
            }
        );
    }

    getDashboardData(payload: any) {
        return this.http.get<DeliveryDashboardResponse>(
            applicationUrls.distributorDashboard + payload,
            {
                params: {
                    // dateFrom,
                    // dateTo
                } as any,
            }
        );
    }
}
