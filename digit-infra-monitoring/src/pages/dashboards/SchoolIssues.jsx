// pages/dashboards/SchoolIssues.jsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import dbService from "../../appwrite/Database.services";

export default function SchoolIssues() {
  const { schoolId } = useParams();

  const { data: issues = [], isLoading, error } = useQuery({
    queryKey: ["issues", schoolId],
    queryFn: () => dbService.getIssuesBySchool(schoolId),
    enabled: !!schoolId,
  });

  if (isLoading) return <div className="p-8 text-center">Loading issues...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">
          Issues for this School
        </h1>

        {issues.length === 0 ? (
          <div className="bg-green-50 p-8 rounded-xl text-center text-green-800">
            No issues reported for this school yet.
          </div>
        ) : (
          <div className="space-y-6">
            {issues.map((issue) => (
              <div key={issue.$id} className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="inline-flex px-4 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {issue.type || "Unknown"}
                  </span>
                  <span className="text-sm font-medium">
                    Status: <span className="text-blue-900 font-bold">{issue.status || "Pending"}</span>
                  </span>
                </div>

                <p className="text-gray-900 mb-4">{issue.description}</p>

                <p className="text-sm text-gray-600">
                  Assigned Technician: {issue.technicianAssigned || "Not assigned"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}