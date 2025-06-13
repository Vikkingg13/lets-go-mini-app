export async function fetchUserByUserId(userId: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/telegram-users?filters[userId][$eq]=${userId}&fields=documentId`, {
      method: 'GET',
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

export async function disconnectFavoriteLocationFromUser(userId: number, locationId: string) {
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
              disconnect: [
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

export async function createNewUser(userId: number, firstName: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/telegram-users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        body: JSON.stringify({
            data: {
                userId: userId,
                firstName: firstName,
                favoriteLocations: []
            }
        })
    });

    if (!response.ok) {
        throw new Error('Failed to create user');
    }

    return response.json();
}

export async function checkAndCreateUser(userId: number, firstName: string) {
    // Сначала проверяем, существует ли пользователь
    const existingUser = await fetchUserByUserId(userId);
    // Если пользователь не существует, создаем нового
    if (!existingUser) {
        return createNewUser(userId, firstName);
    }
    
    return existingUser;
}

// src/services/UserService.ts
export async function fetchUserFavoriteLocations(userId: number) {
  const documentId = await fetchUserByUserId(userId);
  
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/telegram-users/${documentId}?populate[favoriteLocations][populate]=photo`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch favorite locations');
  }

  const data = await response.json();
  return data.data.favoriteLocations;
}