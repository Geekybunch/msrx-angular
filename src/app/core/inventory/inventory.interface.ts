import { ProductI } from '../common/common.interface';
import { PlantCommon } from '../grower/grower.interface';

export interface InventoryDetailQuantity {
    quantityLeft: number;
    // materialId: ProductI | PlantCommon;
    materialId: ProductI;
}

export interface InventoryDetailsResponse {
    data: {
        quantity: InventoryDetailQuantity[];
    };
}

export interface InventoryLog {
    _id: string;
    onModel: 'Product' | 'Plant';
    business: string;
    action: 'ADD' | 'SUBTRACT';
    deliveryId: string | null;
    deliveryOnModel: string;
    materialId: ProductI;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface InventoryLogResponse {
    data: {
        quantity: {
            results: InventoryLog[];
            page: number;
            limit: number;
            totalPages: number;
            totalResults: number;
        };
    };
}

export interface AddQuantityInventoryI {
    materialId: string;
    quantity: number;
}
