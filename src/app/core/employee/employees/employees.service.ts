import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { cultivatorUrls } from '../urls';
import { AuthService } from 'app/core/auth/auth.service';
import { CreateEmployeRequest } from './employess.interface';
@Injectable({
    providedIn: 'root',
})
export class EmployeesService {
    constructor(private http: HttpClient, private authService: AuthService) {}

    getemployeesDetails(payload: any) {
        return this.http.get<any>(cultivatorUrls.employees + payload);
    }
    changeEmployeeStatus(id: number, data: any) {
        return this.http.put<any>(
            cultivatorUrls.employees + '/' + id + '/status',
            data
        );
    }
    saveEmployee(request: CreateEmployeRequest) {
        return this.http.post(cultivatorUrls.employees, request);
    }

    deleteEmployee(id: string) {
        return this.http.delete<any>(cultivatorUrls.employees + '/' + id);
    }
    updateEmploye(employeeId: string, request: CreateEmployeRequest) {
        return this.http.put(
            cultivatorUrls.employees + '/' + employeeId,
            request
        );
    }
}
