import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { adminUrls } from '../urls';
import { AuthService } from 'app/core/auth/auth.service';
@Injectable({
    providedIn: 'root',
})
export class EmployeesService {
    constructor(private http: HttpClient, private authService: AuthService) {}

    getemployeesDetails(payload: any) {
        return this.http.get<any>(adminUrls.employees + payload);
    }
    changeEmployeeStatus(id: number, data: any) {
        return this.http.put<any>(
            adminUrls.employees + '/' + id + '/approval',
            data
        );
    }
    deleteEmployee(id: number) {
        return this.http.delete<any>(adminUrls.employees + '/' + id);
    }
}
