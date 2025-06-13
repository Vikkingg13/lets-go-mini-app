import Favorite from "@/components/Favorite/Favorite"
import { fetchLocations } from "@/services/LocationService";
import { fetchUserFavoriteLocations } from "@/services/UserService";

export default async function LocationPage({ params }
  : {  
    params: Promise<{ documentId: number }>
  }) {
  const documentId = (await params).documentId;

  const data = await fetchUserFavoriteLocations(documentId);

  return (
    <div>
      <Favorite locations={data}
      />
      </div>
  )
}