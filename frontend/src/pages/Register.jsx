
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !userId || !password || !department) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          userId,
          password,
          department,
          role: "student",
        }
      );

      alert(response.data.message || "Registration Successful");

      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          🌿 Green Campus AI
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 rounded mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="User ID"
          className="w-full border p-3 rounded mb-3"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <input
          type="text"
          placeholder="Department"
          className="w-full border p-3 rounded mb-3"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-5"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Register
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-green-600 font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;