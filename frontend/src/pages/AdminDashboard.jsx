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
console.log(filteredIssues);
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 sm:p-6 md:p-8 lg:p-10">

        <h1 className="
text-2xl 
sm:text-3xl 
lg:text-4xl 
font-bold 
text-green-800 
mb-8
">
🛠 Admin Control Center
</h1>

<p className="text-gray-600 mb-6 text-sm sm:text-base">
Monitor campus issues, analyze environmental trends and take action 🌱
</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="
bg-white
shadow-lg
rounded-2xl
p-5
sm:p-6
hover:-translate-y-2
transition
duration-300
border
border-green-100
">
            <h2 className="text-gray-500 font-medium">
📋 Total Reports
</h2>
            <p className="text-2xl sm:text-3xl font-bold">{issues.length}</p>
          </div>

          <div className="
bg-white
shadow-lg
rounded-2xl
p-5
sm:p-6
hover:-translate-y-2
transition
duration-300
border
border-green-100
">
            <h2 className="text-gray-500 font-medium">
📋 Pending
</h2>
            <p className="text-2xl sm:text-3xl font-bold text-yellow-500">{pendingCount}</p>
          </div>

          <div className="
bg-white
shadow-lg
rounded-2xl
p-5
sm:p-6
hover:-translate-y-2
transition
duration-300
border
border-green-100
">
            <h2 className="text-gray-500 font-medium">
📋 Resolved
</h2>
            <p className="text-2xl sm:text-3xl font-bold text-green-600">{resolvedCount}</p>
          </div>

          <div className="
bg-white
shadow-lg
rounded-2xl
p-5
sm:p-6
hover:-translate-y-2
transition
duration-300
border
border-green-100
">
            <h2 className="text-gray-500 font-medium">
              🌱 Eco Score
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-green-700">{ecoScore}%</p>
          </div>

        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">

  <div className="
bg-white
shadow-lg
rounded-2xl
p-6
border
border-green-100
hover:-translate-y-2
hover:shadow-xl
transition
duration-300
">
   <h2 className="text-lg font-bold text-green-700 mb-3">
      ♻️ Most Common Waste
    </h2>
    <p className="text-xl sm:text-2xl font-bold mt-2 break-words">
      {topCategory}
    </p>
  </div>

  <div className="
bg-white
shadow-lg
rounded-2xl
p-6
border
border-green-100
hover:-translate-y-2
hover:shadow-xl
transition
duration-300
">
    <h2 className="text-lg font-bold text-green-700 mb-3">
      📍 Hotspot Location
    </h2>
    <p className="text-xl sm:text-2xl font-bold mt-2 break-words">
      {topLocation}
    </p>
  </div>

  <div className="
bg-white
shadow-lg
rounded-2xl
p-6
border
border-green-100
hover:-translate-y-2
hover:shadow-xl
transition
duration-300
">
    <h2 className="text-lg font-bold text-red-600 mb-3">
      ⚠️ High Priority Issues
    </h2>
    <p className="text-3xl font-bold mt-2">
      {highPriority}
    </p>
  </div>

</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

  <div className="
bg-white
shadow-lg
rounded-2xl
p-6
border
border-green-100
hover:-translate-y-2
hover:shadow-xl
transition
duration-300
">
    <h2 className="text-xl font-bold text-green-700 mb-4">
      📊 Campus Issue Status Overview
    </h2>

    <div className="w-full max-w-sm mx-auto">
      <Pie data={pieData} />
    </div>
  </div>

  <div className="
bg-white
shadow-lg
rounded-2xl
p-6
border
border-green-100
hover:-translate-y-2
hover:shadow-xl
transition
duration-300
">
    <h2 className="text-xl font-bold text-green-700 mb-4">
      🚨 Priority Level Analysis
    </h2>

    <div className="w-full max-w-lg mx-auto">
  <Bar data={barData} />
</div>
  </div>

</div>
        <div className="
bg-white
shadow-lg
rounded-2xl
p-6
border
border-green-100
hover:-translate-y-2
hover:shadow-xl
transition
duration-300
">
          <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-4">
            Recent Reports
          </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

  <input
    type="text"
    placeholder="🔍 Search title or location..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="
border-2
border-green-200
rounded-xl
p-3
focus:outline-none
focus:border-green-500
transition
"
  />

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
   className="
border-2
border-green-200
rounded-xl
p-3
focus:outline-none
focus:border-green-500
transition
"
  >
    <option value="All">All Status</option>
    <option value="Pending">Pending</option>
    <option value="Resolved">Resolved</option>
  </select>

  <select
    value={priorityFilter}
    onChange={(e) => setPriorityFilter(e.target.value)}
    className="
border-2
border-green-200
rounded-xl
p-3
focus:outline-none
focus:border-green-500
transition
"
  >
    <option value="All">All Priority</option>
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>

  <select
    value={categoryFilter}
    onChange={(e) => setCategoryFilter(e.target.value)}
    className="
border-2
border-green-200
rounded-xl
p-3
focus:outline-none
focus:border-green-500
transition
"
  >
    <option value="All">All Categories</option>

    {[...new Set(issues.map((issue) => issue.category))].map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ))}
  </select>

</div>
          <div className="overflow-x-auto">
  <table className="min-w-full border-collapse ">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th className="text-left whitespace-nowrap px-2 py-2">Issue</th>
                <th className="text-left whitespace-nowrap px-2 py-2">Priority</th>
                <th className="text-left whitespace-nowrap px-2 py-2">Recommendation</th>
                <th className="text-left whitespace-nowrap px-2 py-2">Status</th>
              </tr>
            </thead>

               <tbody>
  {filteredIssues.map((issue) => (
    <tr key={issue._id}>

      <td className="px-2 py-3 break-words">
        {issue.title}
      </td>

      <td className="px-2 py-3 break-words">
        <span
          className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
            issue.priorityLevel === "High"
              ? "bg-red-500"
              : issue.priorityLevel === "Medium"
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
        >
          {issue.priorityLevel}
        </span>
      </td>

      <td className="px-2 py-3 break-words">
        <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-xl text-sm border border-blue-200">
          {issue.recommendation}
        </div>
      </td>

      <td className="px-2 py-3 break-words">
        <span
          className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
            issue.status === "Resolved"
              ? "bg-green-600"
              : "bg-yellow-500"
          }`}
        >
          {issue.status}
        </span>

        {issue.status !== "Resolved" && (
          <button
            onClick={() => updateStatus(issue._id)}
            className="mt-2 sm:mt-0 sm:ml-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow transition w-full sm:w-auto"
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

      </div>
    </MainLayout>
  );
}

export default AdminDashboard;