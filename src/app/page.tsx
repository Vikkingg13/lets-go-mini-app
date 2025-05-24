import { LocationService } from "@/services/LocationService";
import Main from "@/components/Main/Main"

export default async function Home() {

  const data = await LocationService.fetchLocations();

  return (
    <div>
      <Main
        locations={data}
      />
      </div>
  )
}