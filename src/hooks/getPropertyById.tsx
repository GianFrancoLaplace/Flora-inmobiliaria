import { Property } from "@/types/Property";

// 1. Marcar la función como 'async'
export async function getPropertyById(id: string): Promise<Property | null> {
    try {
        const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

        const response = await fetch(`${baseUrl}/api/properties/${id}`, {
            cache: 'no-store', // Ideal para datos que cambian frecuentemente
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {

            console.error(`Error fetching property ${id}:`, response.status, response.statusText);
            return null;
        }

        const propertyData: Property = await response.json();

        return propertyData;

    } catch (error) {
        console.error('Error in getProperty:', error);
        return null;
    }
}