export interface Address {
    city?: string;
    street?: string;
    building?: number | null;
    apartment?: number | null;
}

export interface Feature {
    code: string;
    label: string;
    value: boolean;
}