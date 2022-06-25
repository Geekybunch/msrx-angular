export interface PatientI {
    createdAt: string;
    name: string;
    updatedAt: string;
    _id: string;
}

export interface PatientDashboardResponseI {
    message: string;
    data: {
        bookingCount: number;
    };
}
