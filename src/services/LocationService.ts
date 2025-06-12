import { Location } from '../types/Location';

export async function fetchLocations() {
        const response = await fetch(`${process.env.SERVER_URL}/api/locations?populate=photo&fields[0]=title&fields[1]=summary&fields[2]=type&fields[3]=city`, {
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
        const response = await fetch(`${process.env.SERVER_URL}/api/locations/${documentId}?populate=photo&fields[0]=title&fields[1]=description&fields[2]=type&fields[3]=city&fields[4]=pros&fields[5]=cons&fields[6]=work_time&fields[7]=link&fields[8]=address`, {
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
