import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <MainLayout>
        <div className="p-10 text-center text-xl">
          Loading Profile...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-green-50 p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">

          <div className="text-center">
            <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center text-white text-4xl mx-auto">
              👤
            </div>

            <h1 className="text-3xl font-bold mt-4 text-green-700">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Profile
            </h1>
          </div>

          <div className="mt-8 space-y-4">

            <div className="border rounded-lg p-4">
              <strong>Name:</strong> {user.name}
            </div>

            <div className="border rounded-lg p-4">
              <strong>User ID:</strong> {user.userId}
            </div>

            <div className="border rounded-lg p-4">
              <strong>Email:</strong> {user.email}
            </div>

            <div className="border rounded-lg p-4">
              <strong>Department:</strong> {user.department}
            </div>

            <div className="border rounded-lg p-4">
              <strong>Role:</strong> {user.role}
            </div>

            <div className="border rounded-lg p-4">
              <strong>Eco Points:</strong> {user.ecoPoints}
            </div>

            <div className="border rounded-lg p-4">
              <strong>Badge:</strong> {user.badge}
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Profile;