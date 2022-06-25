import { PatientI } from '../patient/patient.interface';
import { BOOKIN_STATUS } from '../wellness/bookin.enums';
import { WellnessCenterI } from '../wellness/wellness.interface';

/* eslint-disable @typescript-eslint/naming-convention */
export interface SlotCountI {
    slot: string;
    count: number;
}

export interface GetWellnessSlotsResponse {
    data: {
        slotCounts: SlotCountI[];
    };
}

export interface CreateBookingI {
    bookingDate: string;
    patient: string;
    wellnessCenter: string;
    patientArrivalTime: string;
    timeSlotStart: string;
    timeSlotEnd: string;
}

export interface BookingI {
    status: BOOKIN_STATUS;
    statusReason: string;
    _id: string;
    bookingDate: Date;
    patient: PatientI;
    patientArrivalTime: string;
    patientVisitedTime: Date;
    timeSlotEnd: string;
    timeSlotStart: string;
    wellnessCenter: WellnessCenterI;
    dispensaryDetails: any[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface BookingListResponse {
    data: {
        bookings: {
            results: BookingI[];
            page: number;
            limit: number;
            totalPages: number;
            totalResults: number;
        };
    };
}
export const BookingList = [
    'patient',
    'bookingDate',
    'patientArrivalTime',
    'isApproved',
    'actions',
];
