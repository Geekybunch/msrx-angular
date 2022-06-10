import { EmployeeI } from 'app/core/auth/auth.interface';
import { AttendanceStatus } from './attendance.enums';

export interface AttendanceElementI {
    _id: string;
    status: AttendanceStatus;
    time: Date;
}

export interface AttendanceStatusObjectI {
    _id: string;
    date: string;
    employee: EmployeeI;
    attendanceStatus: AttendanceElementI[];
    createdAt: Date;
    updatedAt: Date;
}

export interface AttendanceResponse {
    data: {
        lastStatus: AttendanceStatusObjectI;
    };
}

export interface AttendanceListResponse {
    data: {
        attendances: {
            results: AttendanceStatusObjectI[];
            page: number;
            limit: number;
            totalPages: number;
            totalResults: number;
        };
    };
}
