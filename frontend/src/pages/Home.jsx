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
          "https://green-campus-1.onrender.com/api/issues"
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

  const stats = [
    {
      title: "Total Reports",
      value: issues.length,
      icon: "📋",
      style: "text-green-700",
    },
    {
      title: "Pending",
      value: pendingCount,
      icon: "⏳",
      style: "text-yellow-500",
    },
    {
      title: "Resolved",
      value: resolvedCount,
      icon: "✅",
      style: "text-green-600",
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 sm:p-6 md:p-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 animate-fadeIn">

          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-800">
              🌿 Green Campus AI
            </h1>

            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Making campus cleaner with technology and teamwork 🌱
            </p>
          </div>


          <div className="bg-green-600 text-white px-5 py-2 rounded-full shadow-lg w-fit">
            👤 Student
          </div>

        </div>


        {/* Eco Score Card */}
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-7 mb-6 hover:scale-[1.02] transition duration-300">

          <h2 className="text-lg sm:text-xl font-semibold text-green-700">
            🌱 Campus Eco Score
          </h2>

          <div className="flex items-center gap-3 mt-3">

            <p className="text-4xl sm:text-5xl font-bold text-green-600">
              {ecoScore}%
            </p>

            <span className="text-3xl">
              🌎
            </span>

          </div>

          <p className="text-gray-500 mt-2 text-sm">
            Every report helps build a greener campus.
          </p>

        </div>


        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

          {stats.map((stat, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-5 hover:-translate-y-2 transition duration-300"
            >

              <div className="text-3xl mb-3">
                {stat.icon}
              </div>

              <h3 className="text-gray-500 text-sm sm:text-base">
                {stat.title}
              </h3>

              <p className={`text-3xl font-bold mt-2 ${stat.style}`}>
                {stat.value}
              </p>

            </div>

          ))}

        </div>



        {/* Recent Issues */}
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-7">

          <h2 className="text-xl sm:text-2xl font-bold mb-5 text-green-800">
            📋 Recent Campus Issues
          </h2>


          {issues.length === 0 ? (

            <div className="text-center py-8 text-gray-500">
              🌱 No issues reported yet. Be the first one to help campus!
            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {issues.map((issue)=>(

                <div
                  key={issue._id}
                  className="border rounded-xl p-4 hover:shadow-md transition"
                >

                  <h3 className="font-bold text-lg break-words">
                    {issue.title}
                  </h3>

                  <p className="mt-2">
                    📍 {issue.location}
                  </p>

                  <p className="mt-1">
                    ⚠ Severity: {issue.severity}
                  </p>

                  <p className="mt-1">
                    📌 Status: {issue.status}
                  </p>

                </div>

              ))}

            </div>

          )}



          <div className="mt-8 flex justify-center">

            <Link
              to="/report"
              className="w-full sm:w-auto text-center bg-green-600 text-white px-8 py-3 rounded-full shadow hover:bg-green-700 hover:scale-105 transition"
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