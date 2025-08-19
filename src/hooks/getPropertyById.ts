import { Property } from "@/types/Property";

export async function getPropertyById(id: string): Promise<Property | null> {
    try {
        const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

        const response = await fetch(`/api/properties/${id}`, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            console.error(`Error fetching property ${id}:`, response.status, response.statusText);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error in getProperty:', error);
        return null;
    }
}
