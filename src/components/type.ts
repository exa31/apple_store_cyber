export interface CardProps {
    _id: string;
    name: string;
    price: number;
    description: string;
    image_details: string[];
    image_thumbnail: string;
    category?: {
        name: string;
        _id: string;
    } | string;
    createdAt?: string;
    updatedAt?: string;
}
