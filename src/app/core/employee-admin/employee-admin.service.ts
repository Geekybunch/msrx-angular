import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { applicationUrls } from '../urls';
import {
    CreateEmployeRequest,
    EmployeesListResponse,
} from './employee-admin.interface';

@Injectable({
    providedIn: 'root',
})
export class EmployeeAdminService {
    constructor(private http: HttpClient) {}

    getEmployeList(payload: any) {
        return this.http.get<any>(applicationUrls.employeeAdmin + payload);
    }
    getEmployees() {
        return this.http.get<any>(applicationUrls.employeeAdmin);
    }

    saveEmploye(request: CreateEmployeRequest) {
        return this.http.post(applicationUrls.employeeAdmin, request);
    }

    updateStatus(employeeId: string, isApproved: boolean) {
        return this.http.put(
            applicationUrls.employeeStatusAdmin.replace(
                '{{employeeId}}',
                employeeId
            ),
            {
                isApproved,
            }
        );
    }

    updateEmploye(employeeId: string, request: CreateEmployeRequest) {
        return this.http.put(
            applicationUrls.employeeAdmin + '/' + employeeId,
            request
        );
    }

    deleteEmploye(employeeId: string) {
        return this.http.delete(
            applicationUrls.employeeAdmin + '/' + employeeId
        );
    }
}
