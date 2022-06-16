export enum UserType {
    patient = 'Patient',
    business = 'Business',
    employee = 'Employee',
}

export enum OnModelType {
    employee = 'Employee',
    patient = 'Patient',
}

export enum BusinessTypeEnums {
    cultivator = 'Cultivator',
    tester = 'Tester',
    processor = 'Processor',
    manufacturer = 'Manufacturer',
    disposer = 'Disposer',
    distributor = 'Distributor',
    dispensary = 'Dispensary',
    wellnessCenter = 'WellnessCenter',
    stateAgency = 'stateAgency',
}

export enum EmployeeType {
    admin = 'Admin',
    employe = 'Employee',
}

export const DEFAULT_POPULATED_FIELDS = ['plant', 'tester', 'employee'];
export enum QRType {
    PLANT,
    PRODUCT,
    BOOKING,
    PATIENT,
    EMPLOYEE_ATTENDANCE,
}
