export async function fetchFavoriteLocations() {
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

export async function fetchUserByUserId(userId: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/telegram-users?filters[userId][$eq]=${userId}&fields=documentId`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        next: { revalidate: 3600 }
    });
    const resp = await response.json();
    return resp.data[0]?.documentId;
}

export async function connectFavoriteLocationToUser(userId: number, locationId: string) {
    const documentId = await fetchUserByUserId(userId);
    
    const response = await fetch
        (`${process.env.NEXT_PUBLIC_SERVER_URL}/api/telegram-users/${documentId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
            },
          method: 'put',
          body: JSON.stringify({
            data: {
                favoriteLocations: {
                connect: [
                  { documentId: locationId }
                ]
              }
            }
          })
        }
      );
    
    if (!response.ok) {
        throw new Error('Failed to fetch locations');
    }
}