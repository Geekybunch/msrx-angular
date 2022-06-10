import { ChartSerisResponseI } from 'app/shared/shared.interface';
import {
    CommonPlantListResponse,
    PlantTestI,
} from '../common/common.interface';

export interface SaveTestResult {
    coa: string | File;
    approved: boolean;
    notes: string;
    testDateTime: string;
}

export type PlantTest = PlantTestI;

export interface GetTestResult {
    data: {
        plantTest: PlantTest;
    };
}

export type TestListResponse = CommonPlantListResponse;

export interface TesterStatsResponse {
    data: {
        plantTestedCount: number;
        plantsTested: ChartSerisResponseI[];
    };
}
