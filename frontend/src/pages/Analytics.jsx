import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";

function Analytics() {

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


  // Category count
  const categoryCount = {};

  issues.forEach((issue) => {

    categoryCount[issue.category] =
      (categoryCount[issue.category] || 0) + 1;

  });


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

const categoryIcons = {
  "General Waste": "🗑️",
  "Plastic Waste": "♻️",
  "Organic Waste": "🍂",
  "E-Waste": "💻",
  "Paper Waste": "📄",
  "Water Management": "💧",
  "Energy": "💡",
  "Cleanliness": "🧹",
  "Maintenance": "🔧",
  "Other": "🌱"
};
  return (
    <MainLayout>

      <div className="min-h-screen bg-green-50 p-6">

        <h1 className="text-3xl font-bold text-green-700 mb-6">
          📊 Campus Analytics
        </h1>


        <div className="grid md:grid-cols-2 gap-6">


          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="font-bold text-xl mb-4">
              Issue Categories
            </h2>


            <ul className="space-y-2">

              {Object.entries(categoryCount).map(
                ([category, count]) => (

                <li key={category}>
                    {categoryIcons[category] || "🌱"} {category} - {count}
                </li>

              ))}

            </ul>

          </div>



          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="font-bold text-xl mb-4">
              Monthly Progress
            </h2>


            <p>
              Total Reports : {issues.length}
            </p>


            <p>
              Resolved : {resolvedCount}
            </p>


            <p>
              Pending : {pendingCount}
            </p>


            <p className="text-green-700 font-bold mt-4">
              Eco Score : {ecoScore}%
            </p>


          </div>


        </div>


      </div>

    </MainLayout>
  );
}

export default Analytics;