export interface Products {
    name: string;
    businessType: string;
    sku: string;
    description: string;
    dosage: number;

    actions: any;
}

export const displayedColumns = [
    'name',
    'businessType',
    'sku',
    'description',
    'dosage',
    'actions',
];
