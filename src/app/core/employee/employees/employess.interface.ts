import { EmployeeType } from 'app/shared/shared.enums';

export interface EmployeesList {
    idNumber: number;
    name: number;
    type: string;
    isApproved: boolean;
    action: any;
}

export const DisplayedEmployees = [
    'idNumber',
    'name',
    'type',
    'isApproved',
    'action',
];

export interface EmployeeI {
    isApproved: boolean;
    _id: string;
    idNumber: string;
    type: EmployeeType;
    employer: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateEmployeRequest {
    idNumber: string;
    name: string;
    type: EmployeeType;
}
