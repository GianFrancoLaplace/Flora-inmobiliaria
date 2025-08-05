import {Characteristic} from "@prisma/client";

export async function getCharacteristicsByPropertyId(id: string): Promise<Characteristic[] | null> {
    try {
        const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

        const response = await fetch(`${baseUrl}/api/characteristics/${id}`, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            console.error(`Error fetching characteristics for property ${id}:`, response.status, response.statusText);
            return null;
        }

        return await response.json(); // Esto devolvería un array

    } catch (error) {
        console.error('Error in getCharacteristicsByPropertyId:', error);
        return null;
    }
}
