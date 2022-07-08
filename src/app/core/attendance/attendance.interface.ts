import { EmployeeI } from '../auth/auth.interface';
import { AttendanceStatus } from './attendance.enums';

export interface AttendanceNoDataResponse {
    data: {
        lastStatus: {
            lastStatus: string;
        };
    };
}

// export interface AttendanceStatusI {
//     _id: string;
//     status: AttendanceStatus;
//     time: string;
// }

// export interface LastStatus {
//     _id: string;
//     date: string;
//     employee: string;
//     attendanceStatus: AttendanceStatusI;
//     createdAt: Date;
//     updatedAt: Date;
// }

// export interface AttendanceResponse {
//     data: {
//         lastStatus: LastStatus;
//     };
// }

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
