export interface Products {
    name: string;
    ingredients: string;
    sku: string;
    description: string;
    dosage: number;

    actions: any;
}

export const displayedColumns = [
    'name',
    'sku',
    'ingredients',
    'description',
    'dosage',
    'actions',
];
