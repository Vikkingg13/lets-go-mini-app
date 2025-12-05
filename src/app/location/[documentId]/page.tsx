import LocationDetail from "@/components/LocationDetails/LocationDetails";
import { fetchLocationById } from "@/services/LocationService"; // Убедитесь, что этот путь правильный
import { notFound } from "next/navigation";

interface LocationPageProps {
  params: {
    documentId: string;
  };
}

export default async function LocationPage({ params }
  : {  
    params: Promise<{ documentId: string }>
  }) {
  const documentId = (await params).documentId;

  // Загружаем данные о локации по ID
  const location = await fetchLocationById(documentId);

  console.log(location);

  // Если локация не найдена, показываем страницу 404
  if (!location) {
    notFound();
  }

  return (
    <div>
      {/* Передаем загруженные данные в компонент LocationDetail */}
      <LocationDetail location={location} />
    </div>
  );
}