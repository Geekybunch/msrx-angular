// export interface ProcessingResult {
//     _id: string;
//     processor: string;
//     employee: string;
//     extractionMethodUsed: string;
//     ingredients: string;
//     approved: boolean;
//     processDateTime: Date;
//     updatedAt: Date;
//     createdAt: Date;
// }

// export interface PlantCommon {
//     _id: string;
//     grower: string;
//     employee: string;
//     batchNumber: string;
//     geneticStain: string;
//     geneticCompany: string;
//     nutrientManufacture: string;
//     phase: {
//         [key: string]: string;
//     };
//     wetWeight: string;
//     dryWeight: string;
//     createdAt: Date;
//     updatedAt: Date;
//     plantTest: string;
// }

// export interface GrowerPlant extends PlantCommon {
//     processingResult: ProcessingResult;
//     plantProcess: string;
// }
export interface CreatePlantRequest {
    batchNumber: number;
    geneticStain: string;
    geneticCompany: string;
    nutrientManufacture: string;
    phase: {
        [key: string]: string;
    };
    wetWeight: number;
    dryWeight: number;
    discardedWeight: number;
}

export interface GrowerPlant {
    batchNumber: string;
    geneticStain: string;
    geneticCompany: string;
    grower: string;
    plantTest: string;
    plantProcess: string;
    actions: any;
}

export const DisplayedPlant = [
    'batchNumber',
    'geneticStain',
    'geneticCompany',
    'grower',
    'plantTest',
    'plantProcess',
    'actions',
];

// export interface GrowerDashboardResponse {
//     data: {
//         plantCount: number;
//         plantTestedCount: number;
//         plantProcessCount: number;
//         plantsAdded: any[];
//         plantsTested: any[];
//         plantsProcessed: any[];
//     };
// }
