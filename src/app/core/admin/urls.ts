import { environment } from '../../../environments/environment';

class Urls {
    serverUrl: string;

    constructor() {
        this.serverUrl = `${environment.apiUrl}/admin`;
    }

    get dashboard() {
        return this.serverUrl + '/stats';
    }
    get plants() {
        return this.serverUrl + '/plants';
    }
    get patients() {
        return this.serverUrl + '/patients';
    }
    get employees() {
        return this.serverUrl + '/employees';
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
    get stateAgencies() {
        return this.serverUrl + '/state-agencies';
    }
}
export const adminUrls = new Urls();
