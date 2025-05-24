import { Location } from '../types/Location';

export class LocationService {
    static async fetchLocations(): Promise<Location[]> {
        const response = await fetch(`${process.env.SERVER_URL}/api/locations?populate=*`, {
            headers: {
                Authorization: `Bearer ${process.env.API_TOKEN}`,
            },
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch locations');
        }
        
        const array = (await response.json()).data;
        array.forEach((location: Location) => {
            console.log(location);
        });

        return array;
    }

    static async fetchLocationById(id: string): Promise<Location> {
        const response = await fetch(`${process.env.SERVER_URL}/api/locations/${id}`, {
            headers: {
                Authorization: `Bearer ${process.env.API_TOKEN}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch location');
        }
        return response.json();
    }
}
