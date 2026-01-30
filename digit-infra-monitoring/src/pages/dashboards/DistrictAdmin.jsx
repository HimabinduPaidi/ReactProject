// pages/dashboards/DistrictAdmin.jsx
export default function DistrictAdmin() {
  console.log("DistrictAdmin component MOUNTED successfully!");

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-10">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">
          District Admin Dashboard
        </h1>
        <p className="text-xl text-gray-700 mb-4">
          This is a test render — if you see this text, the page is working!
        </p>
        <p className="text-lg text-green-700 font-medium">
          Check your browser console — you should see the message:  
          "DistrictAdmin component MOUNTED successfully!"
        </p>
        <button
          onClick={() => alert("Button works!")}
          className="mt-6 bg-blue-900 text-white px-8 py-4 rounded-lg hover:bg-blue-800"
        >
          Test Button
        </button>
      </div>
    </div>
  );
}