import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";

function Home() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/issues"
        );

        setIssues(response.data.issues);
      } catch (error) {
        console.log(error);
      }
    };

    fetchIssues();
  }, []);

  const pendingCount = issues.filter(
    (issue) => issue.status === "Pending"
  ).length;

  const resolvedCount = issues.filter(
    (issue) => issue.status === "Resolved"
  ).length;

  const ecoScore =
    issues.length === 0
      ? 0
      : Math.round((resolvedCount / issues.length) * 100);

  return (
    <MainLayout>
      <div className="min-h-screen bg-green-50 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-green-700">
              🌿 Green Campus AI
            </h1>
            <p className="text-gray-600">
              Welcome to your Campus Sustainability Dashboard
            </p>
          </div>

          <div className="bg-green-600 text-white px-4 py-2 rounded-lg">
            👤 Student
          </div>
        </div>

        {/* Eco Score */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-green-700">
            🌱 Campus Eco Score
          </h2>
          <p className="text-5xl font-bold mt-3 text-green-600">
            {ecoScore}%
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500">Total Reports</h3>
            <p className="text-3xl font-bold">{issues.length}</p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500">Pending</h3>
            <p className="text-3xl font-bold text-yellow-500">
              {pendingCount}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-gray-500">Resolved</h3>
            <p className="text-3xl font-bold text-green-600">
              {resolvedCount}
            </p>
          </div>
        </div>

        {/* Recent Issues */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            📋 Recent Campus Issues
          </h2>

          <div className="space-y-3">
            {issues.slice(0, 5).map((issue) => (
              <div key={issue._id} className="border rounded-lg p-4">
                <h3 className="font-bold">{issue.title}</h3>

                <p>📍 {issue.location}</p>

                <p>⚠ {issue.severity}</p>

                <p>📌 {issue.status}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              to="/report"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              ➕ Report New Issue
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;