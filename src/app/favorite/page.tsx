import Favorite from "@/components/Favorite/Favorite"
import { fetchLocations } from "@/services/LocationService";

export default async function Page() {

  const data = await fetchLocations();

  return (
    <div>
      <Favorite locations={data}
      />
      </div>
  )
}