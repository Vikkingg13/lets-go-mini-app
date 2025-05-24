import LocationDetail from "@/components/LocationDetails/LocationDetails";
import { LocationService } from "@/services/LocationService"; // Убедитесь, что этот путь правильный
import { notFound } from "next/navigation";

interface LocationPageProps {
  params: {
    documentId: string;
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { documentId } = params;

  // Загружаем данные о локации по ID
  const location = await LocationService.fetchLocationById(documentId);

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