import { Location } from '../types/Location';

export async function fetchLocations() {
        const response = await fetch(`${process.env.SERVER_URL}/api/locations?populate=photo&field[0]=documentId&fields[1]=title&fields[2]=summary&fields[3]=type&fields[4]=city`, {
            headers: {
                Authorization: `Bearer ${process.env.API_TOKEN}`,
            },
            next: { revalidate: 60 }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch locations');
        }
        
        const array = (await response.json()).data;

        return array;
    }


    export async function fetchLocationById(documentId: string) {
        const response = await fetch(`${process.env.SERVER_URL}/api/locations/${documentId}?populate=*`, {
            headers: {
                Authorization: `Bearer ${process.env.API_TOKEN}`,
            },
            next: { revalidate: 60 }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch location');
        }
        return (await response.json()).data;
    }
