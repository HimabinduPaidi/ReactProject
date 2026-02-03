// pages/dashboards/ZoneSchools.jsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import dbService from "../../appwrite/Database.services";
import { Link } from "react-router-dom";

export default function ZoneSchools() {
  const { zoneId } = useParams();

  const { data: schools = [], isLoading, error } = useQuery({
    queryKey: ["schools", zoneId],
    queryFn: () => dbService.getSchoolsByZone(zoneId),
    enabled: !!zoneId,
  });

  if (isLoading) return <div className="p-8 text-center">Loading schools...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">
          Schools in this Zone
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {schools.map((school) => (
            <Link
              key={school.$id}
              to={`/dashboard/district-admin/school/${school.$id}`}
              className="bg-white rounded-xl shadow hover:shadow-xl transition-all overflow-hidden"
            >
              <img
                src={school.image || "https://via.placeholder.com/400x225?text=School"}
                alt={school.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-2 truncate">{school.name}</h3>
                <p className="text-sm text-gray-600">
                  Location: {school.location || school.village || "N/A"}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {schools.length === 0 && (
          <p className="text-center text-xl text-gray-600 mt-12">
            No schools assigned to this zone yet.
          </p>
        )}
      </div>
    </div>
  );
}