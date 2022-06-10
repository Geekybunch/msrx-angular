import { EmployeeType } from 'app/shared/shared.enums';
import { EmployeeI } from '../auth/auth.interface';

export interface EmployeesListResponse {
    data: {
        employees: {
            results: EmployeeI[];
            page: number;
            limit: number;
            totalPages: number;
            totalResults: number;
        };
    };
}

export interface CreateEmployeRequest {
    idNumber: string;
    name: string;
    type: EmployeeType;
}
