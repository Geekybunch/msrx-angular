import {
    BusinessTypeEnums,
    EmployeeType,
    OnModelType,
} from 'app/shared/shared.enums';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface Employer {
    isApproved: boolean;
    _id: string;
    businessName: string;
    businessIDNumber: string;
    businessAddress: string;
    businessPhone: string;
    businessType: BusinessTypeEnums;
    createdAt: Date;
    updatedAt: Date;
    employeeRegisterationLink: string;
}

export interface ModelId {
    isApproved: boolean;
    _id: string;
    idNumber: string;
    type: string;
    employer: Employer;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    isEmailVerified: boolean;
    _id: string;
    email: string;
    password: string;
    modelId: ModelId;
    onModel: OnModelType;
    createdAt: Date;
    updatedAt: Date;
}

export interface TokensResponse {
    access: {
        token: string;
        expires: number;
    };
    refresh: {
        token: string;
        expires: number;
    };
}

export interface AuthResponse {
    data: {
        user: User;
    };
    tokens: TokensResponse;
}

export interface RegisterPatientRequest {
    name: string;
    email: string;
    password: string;
}

export interface RegisterBusinessRequest extends RegisterPatientRequest {
    businessType: string;
    businessName: string;
    businessIDNumber: string;
    businessAddress: string;
    businessPhone: string;
    idNumber: string;
}

export interface RegisterEmployeRequest extends RegisterPatientRequest {
    idNumber: string;
    businessIDNumber: string;
}

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

export interface PatientProfile {
    _id: string;
    name: string;
    address: string;
    mobile: string;
    age: string;
    createdAt: Date;
    updatedAt: Date;
    profilePic: string;
}

export interface PatientProfileResponse {
    message: string;
    data: {
        patient: PatientProfile;
    };
}

export interface PatientProfileUpdateRequest extends PatientProfile {}

export interface EmployeesList {
    idNumber: string;
    name: string;
    type: string;
    createdAt: Date;
    isApproved: boolean;
    actions: any;
}

export const DisplayedEmployees = [
    'idNumber',
    'name',
    'type',
    'isApproved',
    'action',
];
