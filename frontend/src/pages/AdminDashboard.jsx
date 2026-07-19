import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);
function AdminDashboard() {
    const [issues, setIssues] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [categoryFilter, setCategoryFilter] = useState("All");
    useEffect(() => {
  const fetchIssues = async () => {
    try {

      const response = await axios.get(
        "https://green-campus-1.onrender.com/api/issues"
      );

      setIssues(response.data.issues);

    } catch (error) {
      console.log(error);
    }
  };

  fetchIssues();

}, []);
    const updateStatus = async (id) => {
    try {
        await axios.put(
        `https://green-campus-1.onrender.com/api/issues/${id}`,
        {
            status: "Resolved"
        }
        );

        alert("Issue marked as resolved");

        window.location.reload();

    } catch (error) {
        console.log(error);
        alert("Failed to update status");
    }
    };
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
            // Most Common Waste Category
const categoryCount = {};

issues.forEach((issue) => {
  categoryCount[issue.category] =
    (categoryCount[issue.category] || 0) + 1;
});

const topCategory =
  Object.keys(categoryCount).length > 0
    ? Object.keys(categoryCount).reduce((a, b) =>
        categoryCount[a] > categoryCount[b] ? a : b
      )
    : "No Data";

// Most Reported Location
const locationCount = {};

issues.forEach((issue) => {
  locationCount[issue.location] =
    (locationCount[issue.location] || 0) + 1;
});

const topLocation =
  Object.keys(locationCount).length > 0
    ? Object.keys(locationCount).reduce((a, b) =>
        locationCount[a] > locationCount[b] ? a : b
      )
    : "No Data";

// High Priority Count
const highPriority = issues.filter(
  (issue) => issue.priorityLevel === "High"
).length;
const mediumPriority = issues.filter(
  (issue) => issue.priorityLevel === "Medium"
).length;

const lowPriority = issues.filter(
  (issue) => issue.priorityLevel === "Low"
).length;

const pieData = {
  labels: ["Pending", "Resolved"],
  datasets: [
    {
      data: [pendingCount, resolvedCount],
      backgroundColor: ["#facc15", "#22c55e"],
    },
  ],
};

const barData = {
  labels: ["High", "Medium", "Low"],
  datasets: [
    {
      label: "Priority",
      data: [highPriority, mediumPriority, lowPriority],
      backgroundColor: ["#ef4444", "#f59e0b", "#22c55e"],
    },
  ],
};
const filteredIssues = issues.filter((issue) => {
  const matchesSearch =
    (issue.title || "").toLowerCase().includes(search.toLowerCase()) ||
    (issue.location || "").toLowerCase().includes(search.toLowerCase());
  const matchesStatus =
    statusFilter === "All" || issue.status === statusFilter;

  const matchesPriority =
    priorityFilter === "All" || issue.priorityLevel === priorityFilter;

  const matchesCategory =
    categoryFilter === "All" || issue.category === categoryFilter;

  return (
    matchesSearch &&
    matchesStatus &&
    matchesPriority &&
    matchesCategory
  );
});
console.log(filteredIssue);
  return (
    <MainLayout>
      <div className="min-h-screen bg-green-50 p-6">

        <h1 className="text-3xl font-bold text-green-700 mb-6">
          🛠 Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-4 gap-4 mb-8">

          <div className="bg-white shadow rounded-xl p-5">
            <h2>Total Reports</h2>
            <p className="text-3xl font-bold">{issues.length}</p>
          </div>

          <div className="bg-white shadow rounded-xl p-5">
            <h2>Pending</h2>
            <p className="text-3xl font-bold text-yellow-500">{pendingCount}</p>
          </div>

          <div className="bg-white shadow rounded-xl p-5">
            <h2>Resolved</h2>
            <p className="text-3xl font-bold text-green-600">{resolvedCount}</p>
          </div>

          <div className="bg-white shadow rounded-xl p-5">
            <h2>Eco Score</h2>
            <p className="text-3xl font-bold text-green-700">{ecoScore}%</p>
          </div>

        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-8">

  <div className="bg-white shadow rounded-xl p-5">
    <h2 className="text-lg font-semibold text-green-700">
      ♻️ Most Common Waste
    </h2>
    <p className="text-2xl font-bold mt-2">
      {topCategory}
    </p>
  </div>

  <div className="bg-white shadow rounded-xl p-5">
    <h2 className="text-lg font-semibold text-blue-700">
      📍 Hotspot Location
    </h2>
    <p className="text-2xl font-bold mt-2">
      {topLocation}
    </p>
  </div>

  <div className="bg-white shadow rounded-xl p-5">
    <h2 className="text-lg font-semibold text-red-600">
      ⚠️ High Priority Issues
    </h2>
    <p className="text-3xl font-bold mt-2">
      {highPriority}
    </p>
  </div>

</div>
        <div className="grid md:grid-cols-2 gap-6 mb-8">

  <div className="bg-white shadow rounded-xl p-6">
    <h2 className="text-xl font-semibold mb-4">
      📊 Issue Status Distribution
    </h2>

    <div className="w-72 mx-auto">
      <Pie data={pieData} />
    </div>
  </div>

  <div className="bg-white shadow rounded-xl p-6">
    <h2 className="text-xl font-semibold mb-4">
      🚨 Severity Distribution
    </h2>

    <Bar data={barData} />
  </div>

</div>
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Recent Reports
          </h2>
            <div className="grid md:grid-cols-4 gap-4 mb-6">

  <input
    type="text"
    placeholder="🔍 Search title or location..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border p-2 rounded-lg"
  />

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="border p-2 rounded-lg"
  >
    <option value="All">All Status</option>
    <option value="Pending">Pending</option>
    <option value="Resolved">Resolved</option>
  </select>

  <select
    value={priorityFilter}
    onChange={(e) => setPriorityFilter(e.target.value)}
    className="border p-2 rounded-lg"
  >
    <option value="All">All Priority</option>
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>

  <select
    value={categoryFilter}
    onChange={(e) => setCategoryFilter(e.target.value)}
    className="border p-2 rounded-lg"
  >
    <option value="All">All Categories</option>

    {[...new Set(issues.map((issue) => issue.category))].map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ))}
  </select>

</div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Issue</th>
                <th className="text-left">Priority</th>
                <th className="text-left">Recommendation</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>

                <tbody>

            {filteredIssues.map((issue)=>(

            <tr key={issue._id}>

            <td>{issue.title}</td>

            <td>
            {issue.priorityLevel}
            </td>
            <td>
                {issue.recommendation}
            </td>
            <td>
            {issue.status}

            {issue.status !== "Resolved" && (
                <button
                onClick={() => updateStatus(issue._id)}
                className="ml-3 bg-green-600 text-white px-3 py-1 rounded"
                >
                Resolve
                </button>
            )}

            </td>

            </tr>

            ))}

            </tbody>
          </table>
        </div>

      </div>
    </MainLayout>
  );
}

export default AdminDashboard;