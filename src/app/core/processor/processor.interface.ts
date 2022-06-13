import { ChartSerisResponseI } from 'app/shared/shared.interface';
import { CommonPlantListResponse } from '../common/common.interface';

export interface CreateProccessResultRequest {
    extractionMethodUsed: string;
    ingredients: string;
    approved: boolean;
    processDateTime: string;
}

export interface GetProcessResult {
    data: {
        plantProcess: any;
    };
}

export type ProcessedListResponse = CommonPlantListResponse;

export interface ProcessorDashboardResponse {
    data: {
        plantProcessedCount: number;
        plantProcessed: ChartSerisResponseI[];
    };
}
