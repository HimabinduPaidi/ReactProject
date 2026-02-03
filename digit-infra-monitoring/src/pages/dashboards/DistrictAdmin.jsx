// pages/dashboards/DistrictAdmin.jsx
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../store/authStore";
import dbService from "../../appwrite/Database.services";
import { Link } from "react-router-dom";

export default function DistrictAdmin() {
  const { user } = useAuthStore();
  const districtId = user?.prefs?.district || user?.district || null;

  const { data: zones = [], isLoading, error } = useQuery({
    queryKey: ["zones", districtId],
    queryFn: () => dbService.getZonesByDistrict(districtId),
    enabled: !!districtId,
  });

  if (isLoading) return <div className="p-8 text-center">Loading zones...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">
          District Admin Dashboard
        </h1>

        {zones.length === 0 ? (
          <p className="text-center text-xl text-gray-600 py-12">
            No zones assigned in this district yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {zones.map((zone) => (
              <div
                key={zone.$id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    {zone.name || "Unnamed Zone"}
                  </h3>

                  <div className="flex gap-4">
                    <Link
                      to={`/dashboard/district-admin/zone/${zone.$id}/technician`}
                      className="flex-1 bg-blue-900 text-white text-center py-3 rounded-lg hover:bg-blue-800 transition"
                    >
                      Technician
                    </Link>

                    <Link
                      to={`/dashboard/district-admin/zone/${zone.$id}/schools`}
                      className="flex-1 bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700 transition"
                    >
                      School
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}