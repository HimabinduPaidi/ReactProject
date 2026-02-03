// pages/dashboards/ZoneTechnician.jsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import dbService from "../../appwrite/Database.services";

export default function ZoneTechnician() {
  const { zoneId } = useParams();

  const { data: technician = null, isLoading, error } = useQuery({
    queryKey: ["technician", zoneId],
    queryFn: () => dbService.getTechnicianByZone(zoneId),
    enabled: !!zoneId,
  });

  if (isLoading) return <div className="p-8 text-center">Loading technician details...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error: {error.message}</div>;
  if (!technician) return <div className="p-8 text-center">No technician assigned to this zone.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">
          Technician Details
        </h1>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {technician.name || "Unnamed Technician"}
            </h2>
            <p className="text-lg text-gray-600 mt-1">
              Zone: {technician.zoneName || "N/A"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-medium mb-3">Stats</h3>
              <p className="text-gray-700">
                <strong>Assigned Schools:</strong> {technician.schoolCount || 0}
              </p>
              <p className="text-gray-700">
                <strong>Pending Issues:</strong> {technician.pendingIssues || 0}
              </p>
              <p className="text-gray-700">
                <strong>Resolved Issues:</strong> {technician.resolvedIssues || 0}
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-medium mb-3">Contact</h3>
              <p className="text-gray-700">
                <strong>Phone:</strong> {technician.phone || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {technician.email || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}