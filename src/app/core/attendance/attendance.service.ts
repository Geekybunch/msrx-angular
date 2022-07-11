import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import moment from 'moment';
import { applicationUrls } from '../urls';
import { AttendanceStatus } from './attendance.enums';
import {
    AttendanceElementI,
    AttendanceListResponse,
    AttendanceResponse,
} from './attendance.interface';

@Injectable({
    providedIn: 'root',
})
export class AttendanceService {
    constructor(private http: HttpClient) {}

    getAttendance(employeeID: string, from: string, to: string) {
        return this.http.get<AttendanceListResponse>(
            applicationUrls.attendanceUrl + employeeID + '/attendance',
            {
                params: {
                    from,
                    to,
                },
            }
        );
    }
    getLastAttendance(employeeId: string) {
        return this.http.get(
            applicationUrls.adminAttendanceLastStatus.replace(
                '{{employeeId}}',
                employeeId
            )
        );
    }
    saveAttendance(status: AttendanceStatus, employeeId: string) {
        return this.http.post(
            applicationUrls.attendanceUrl + employeeId + '/' + 'attendance',
            {
                status,
            }
        );
    }
    calculateWorkingTime(attendanceData: AttendanceElementI[]) {
        console.log(attendanceData);
        let workingHours = 0;
        let start = attendanceData[0];
        for (let index = 1; index < attendanceData.length; index++) {
            const element = attendanceData[index];
            const elementTime = moment(element.time);

            if (element.status === AttendanceStatus.ON_BREAK) {
                workingHours += elementTime.diff(start.time, 'hours', true);
                console.log(
                    'Break Started, calculated worked time yet',
                    workingHours
                );

                if (index < attendanceData.length) {
                    index++;
                    start = attendanceData[index];
                    console.log(
                        'Still array left, skipping break and setting calculation start as next element',
                        index,
                        start
                    );
                }
            } else if (element.status === AttendanceStatus.DONE_FOR_THE_DAY) {
                workingHours += elementTime.diff(start.time, 'hours', true);
                break;
            }
        }

        const lastStatus = attendanceData[attendanceData.length - 1];
        if (lastStatus && lastStatus.status === AttendanceStatus.WORKING) {
            const elementTime = moment(lastStatus.time);
            // Add time till now as well as employee is still working
            workingHours += moment().diff(elementTime, 'hours', true);
        }

        console.log(workingHours);

        return workingHours.toFixed(2);
    }
}
