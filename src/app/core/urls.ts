import { environment } from '../../environments/environment';

class ApplicationURLs {
    serverUrl = environment.apiUrl;

    get growerPlants() {
        return this.serverUrl + '/business/grower/plants';
    }
    get growerDashboard() {
        return this.serverUrl + '/business/grower/stats';
    }

    get plantTest() {
        return this.serverUrl + '/business/tester/plants';
    }
    get plantTestResult() {
        return (
            this.serverUrl + '/business/tester/plants/{{plantId}}/test-results'
        );
    }
    get testerDashboard() {
        return this.serverUrl + '/business/tester/stats';
    }

    get employeeAdmin() {
        return this.serverUrl + '/business/common/employees';
    }
    get employeeStatusAdmin() {
        return (
            this.serverUrl + '/business/common/employees/{{employeeId}}/status'
        );
    }

    get attendance() {
        return (
            this.serverUrl +
            '/business/common/employees/{{employeeId}}/attendance'
        );
    }
    get attendanceUrl() {
        return (
            this.serverUrl +
            '/business/common/employees/{{employeeId}}/attendance'
        );
    }
}
export const applicationUrls = new ApplicationURLs();
