import Main from "@/components/Main/Main"
import { fetchLocations } from "@/services/LocationService";

export default async function Home() {

  const data = await fetchLocations();

  return (
    <div>
      <Main locations={data} />
    </div>
  )
}