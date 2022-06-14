import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { applicationUrls } from '../urls';

import {
    CreateProductsRequest,
    ManufactrorDashboardDataResponse,
    ManufactuedListResponse,
} from './maufacturor.interface';

@Injectable({
    providedIn: 'root',
})
export class ManufactureService {
    constructor(private http: HttpClient) {}

    addProduct(request: CreateProductsRequest) {
        return this.http.post(applicationUrls.manufactureURL, request);
    }

    updateProduct(id: string, request: CreateProductsRequest) {
        return this.http.put(
            applicationUrls.manufactureURL + '/' + id,
            request
        );
    }

    getProductList(payload: any) {
        return this.http.get<any>(applicationUrls.manufactureURL + payload);
    }

    getProductByID(productID) {
        return this.http.get<ManufactuedListResponse>(
            applicationUrls.manufactureURL + '/' + productID
        );
    }

    deleteProductList(productID: string) {
        return this.http.delete(
            applicationUrls.manufactureURL + '/' + productID
        );
    }

    getDashboardData(payload: any) {
        return this.http.get<any>(
            applicationUrls.manufacturerDashboard + payload
        );
    }
}
