import { environment } from '../../../environments/environment';

class Urls {
    serverUrl: string;

    constructor() {
        this.serverUrl = `${environment.apiUrl}/business`;
    }

    get dashboard() {
        return this.serverUrl + '/grower/stats';
    }
    get plants() {
        return this.serverUrl + '/grower/plants';
    }
    get patients() {
        return this.serverUrl + '/patients';
    }
    get employees() {
        return this.serverUrl + '/common/employees';
    }
    get products() {
        return this.serverUrl + '/products';
    }
    get deliveries() {
        return this.serverUrl + '/deliveries';
    }
    get businesses() {
        return this.serverUrl + '/businesses';
    }
    get inventoryLogs() {
        return this.serverUrl + '/inventory/logs';
    }
}
export const cultivatorUrls = new Urls();
