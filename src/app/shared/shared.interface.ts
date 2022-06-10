export interface PaginatedResponse<T = any> {
    data: {
        result: {
            results: T[];
            page: number;
            limit: number;
            totalPages: number;
            totalResults: number;
        };
    };
}

export interface ChartSerisResponseI {
    _id: string;
    count: number;
}
