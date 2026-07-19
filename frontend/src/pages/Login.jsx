import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
  if (!rollNo || !password) {
    toast.warning("Please enter Roll Number and Password");
    return;
  }

  try {
    const response = await axios.post(
  "http://localhost:5000/api/auth/login",
  {
    userId: rollNo,
    password,
  }
);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", response.data.user.role);
    console.log("Role:", response.data.user.role);
    toast.success("Login Successful");

    navigate("/home");
  } catch (error) {
    console.log(error.response?.data);
    toast.error(error.response?.data?.message || "Login Failed");
  }
};


  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-700">
            🌿 Green Campus AI
          </h1>
          <p className="text-gray-600 mt-2">
            College Campus Sustainability Portal
          </p>
        </div>

        <form className="mt-8">
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              Roll Number / Faculty ID
            </label>
           <input
            type="text"
            placeholder="Enter your Roll Number or Faculty ID"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
          </div>

          <button
            type="button" onClick={handleLogin}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Only authorized students and faculty can access this portal.
        </p>
        <p className="text-center mt-4">
        New user?{" "}
        <Link
            to="/register"
            className="text-green-600 font-semibold hover:underline"
        >
            Register here
        </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;