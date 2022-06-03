import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { adminUrls } from '../urls';

@Injectable({
    providedIn: 'root',
})
export class InventoryLogsService {
    constructor(private http: HttpClient) {}
    getInventoryLogs(payload: any) {
        return this.http.get<any>(adminUrls.inventoryLogs + payload);
    }
}
