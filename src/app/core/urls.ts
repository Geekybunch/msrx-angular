import { environment } from '../../environments/environment';

class ApplicationURLs {
    serverUrl = environment.apiUrl;
    get refreshToken() {
        return this.serverUrl + '/auth/refresh-tokens/';
    }

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

    get plantProcessResultList() {
        return this.serverUrl + '/business/processor/plants';
    }
    get plantProcessResult() {
        return (
            this.serverUrl +
            '/business/processor/plants/{{plantId}}/processing-results'
        );
    }
    get processorDashboard() {
        return this.serverUrl + '/business/processor/stats';
    }

    get manufactureURL() {
        return this.serverUrl + '/business/manufacturer/products';
    }
    get manufacturerDashboard() {
        return this.serverUrl + '/business/manufacturer/stats';
    }

    get deliveryURL() {
        return this.serverUrl + '/business/distributor/deliveries';
    }
    get distributorDashboard() {
        return this.serverUrl + '/business/distributor/stats';
    }

    get disposerDashboard() {
        return this.serverUrl + '/business/disposer/stats';
    }
    get delieryVehicle() {
        return this.serverUrl + '/business/distributor/vehicles';
    }

    get commonPlantDetails() {
        return this.serverUrl + '/business/common/plants';
    }
    get commonProductDetails() {
        return this.serverUrl + '/business/common/products';
    }
    get commonListDispensary() {
        return this.serverUrl + '/business/common/dispensaries';
    }
    get commonListBusinesses() {
        return this.serverUrl + '/business/common/businesses';
    }
    get commonValidPrescription() {
        return (
            this.serverUrl +
            '/business/common/patients/{{patientID}}/valid-prescription'
        );
    }
    get wellnessCenterSlots() {
        return (
            this.serverUrl +
            '/business/common/wellness-center/{{wellnessCenter}}/available-slots'
        );
    }
    get inventoryDetails() {
        return this.serverUrl + '/business/common/inventory/details';
    }
    get inventoryLogs() {
        return this.serverUrl + '/business/common/inventory/logs';
    }
    get addManufacturerInventory() {
        return this.serverUrl + '/business/manufacturer/products/quantity';
    }
    get employeeAdmin() {
        return this.serverUrl + '/business/common/employees';
    }
    get employeeStatusAdmin() {
        return (
            this.serverUrl + '/business/common/employees/{{employeeId}}/status'
        );
    }
    get getBookingPrescription() {
        return (
            this.serverUrl +
            '/business/common/booking/{{centreId}}/prescription'
        );
    }
    get getBooking() {
        return this.serverUrl + '/business/common/booking/{{bookingID}}';
    }

    get wellnessCenterProfile() {
        return this.serverUrl + '/business/wellness-centre/profile';
    }
    get wellnessCenterCount() {
        return this.serverUrl + '/business/wellness-centre/bookingCounts';
    }
    get wellnessBookingCenter() {
        return this.serverUrl + '/business/wellness-centre/booking';
    }
    get wellnessBookingUpdate() {
        return (
            this.serverUrl +
            '/business/wellness-centre/booking/{{centreId}}/status'
        );
    }
    get wellnessBookingPrescription() {
        return (
            this.serverUrl +
            '/business/wellness-centre/booking/{{centreId}}/prescription'
        );
    }
    get signWellnessBookingPrescription() {
        return (
            this.serverUrl +
            '/business/wellness-centre/prescriptions/{{centreId}}/sign'
        );
    }
    get wellnessBookingCenterSlots() {
        return this.serverUrl + `/business/wellness-centre/booking/slots`;
    }

    get patientBooking() {
        return this.serverUrl + '/patient/bookings';
    }
    get patientProfile() {
        return this.serverUrl + '/patient/profile';
    }
    get patientDashboard() {
        return this.serverUrl + '/patient/stats';
    }
    get searchWellnesscenter() {
        return this.serverUrl + '/business/common/wellness-center';
    }
    get rateWellnessCenter() {
        return this.serverUrl + '/patient/bookings/{{bookingId}}/rate';
    }
    get searchDispensaries() {
        return this.serverUrl + '/business/common/dispensaries';
    }
    get prescriptionCard() {
        return this.serverUrl + '/business/common/prescriptionCard';
    }

    get dispensaryDashboard() {
        return this.serverUrl + '/business/dispensary/stats';
    }
    get dispensaryDosage() {
        return this.serverUrl + '/business/dispensary/dosage';
    }
    get dispensaryProfile() {
        return this.serverUrl + '/business/dispensary/profile';
    }
    get dispensaryDosageList() {
        return this.serverUrl + '/business/dispensary/dosage/list';
    }

    get adminAttendanceLastStatus() {
        return this.serverUrl + '/admin/attendance/{{employeeId}}/last-status';
    }
    get attendanceUrlAdmin() {
        return this.serverUrl + '/admin/employees/{{employeeId}}/attendance';
    }
    get attendanceUrl() {
        return (
            this.serverUrl +
            '/business/common/employees/{{employeeId}}/attendance'
        );
    }
    get adminAttendanceUrl() {
        return this.serverUrl + '/admin/attendance/';
    }
}
export const applicationUrls = new ApplicationURLs();
