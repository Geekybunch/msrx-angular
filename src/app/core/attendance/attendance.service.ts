import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { applicationUrls } from '../urls';
import { AttendanceListResponse } from './attendance.interface';

@Injectable({
    providedIn: 'root',
})
export class AttendanceService {
    constructor(private http: HttpClient) {}

    getAttendance(employeeID: string, from: string, to: string) {
        return this.http.get<AttendanceListResponse>(
            applicationUrls.attendance.replace('{{employeeId}}', employeeID),
            {
                params: {
                    from,
                    to,
                },
            }
        );
    }
}
