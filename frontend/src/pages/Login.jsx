import WelcomePopup from "../components/WelcomePopup";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [adminClicks, setAdminClicks] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupQuote, setPopupQuote] = useState("");
  const[redirectPath,setRedirectPath]=useState("");
  const quotes = [
  "🌱 Every small action creates a greener tomorrow.",
  "🌿 Thank you for making our campus cleaner today!",
  "💚 Nature smiles because of people like you.",
  "🌍 Together, we can build a sustainable future.",
  "♻️ Reduce today, sustain tomorrow.",
  "🍃 Your kindness to nature inspires everyone.",
  "🌼 A cleaner campus starts with one responsible person—you!",
  "💧 Every drop saved is a gift to the future.",
  "🌳 Plant hope, grow happiness.",
  "🌞 Keep shining and keep our campus green!",
  "🌸 Small eco-actions create big environmental changes.",
  "🦋 Be the change that nature deserves.",
  "🌈 Your efforts make the campus brighter and greener.",
  "🌺 Thank you for caring for our planet.",
  "🐝 Every good deed for nature matters.",
  "🌷 Green hearts create green campuses.",
  "🍀 Keep spreading positive environmental vibes.",
  "🐢 Slow and steady efforts protect nature forever.",
  "🌻 Your contribution makes a real difference.",
  "🕊️ Peace begins with a clean environment.",
  "🍂 One report today, a better tomorrow.",
  "🌙 Even the smallest green step counts.",
  "🌟 You are one of our Green Heroes!",
  "🌎 Let's leave footprints of kindness, not pollution.",
  "🪴 Nature thanks you for every action you take.",
  "🐼 Protect wildlife by protecting our environment.",
  "🌹 Together, we're growing a healthier campus.",
  "✨ Thank you for choosing sustainability today!",
  "💖 Green habits create a beautiful future.",
  "🌿 Keep inspiring others to love and protect nature!"
];
  const navigate = useNavigate();
 
  const handleLogin = async () => {
  if (!rollNo || !password) {
    toast.warning("Please enter Roll Number and Password");
    return;
  }

  try {
    const response = await axios.post(
  "https://green-campus-1.onrender.com/api/auth/login",
  {
    userId: rollNo,
    password,
  }
);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", response.data.user.role);
    const isFirstLogin = !localStorage.getItem("welcomeShown");

let title = "";
let quote = "";

const hour = new Date().getHours();

if (isFirstLogin) {
  title = "🎉 Welcome to Green Campus AI!";
  quote =
    "🌱 We're thrilled to have you in our green community. Together, let's make our campus cleaner, greener, and more sustainable! 💚";

  localStorage.setItem("welcomeShown", "true");
} else {
  if (hour < 12) {
    title = "🌞 Good Morning!";
  } else if (hour < 17) {
    title = "☀️ Good Afternoon!";
  } else {
    title = "🌙 Good Evening!";
  }

  quote = quotes[Math.floor(Math.random() * quotes.length)];
}

setPopupTitle(title);
setPopupQuote(quote);
setShowPopup(true);

console.log("Role:", response.data.user.role);
toast.success("Login Successful");

if (response.data.user.role === "admin") {
  setRedirectPath("/admin");
} else {
  setRedirectPath("/home");
}

setTimeout(() => {
  setShowPopup(false);
  navigate(
    response.data.user.role === "admin" ? "/admin" : "/home"
  );
}, 3000);
  } catch (error) {
    console.log(error.response?.data);
    toast.error(error.response?.data?.message || "Login Failed");
  }
};
const handleAdminLogin = async () => {
  if (!rollNo || !password) {
    toast.warning("Please enter Admin ID and Password");
    return;
  }

  try {
    const response = await axios.post(
      "https://green-campus-1.onrender.com/api/auth/login",
      {
        userId: rollNo,
        password,
      }
    );

    if (response.data.user.role !== "admin") {
      toast.error("This account is not an admin account");
      return;
    }

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", response.data.user.role);

    toast.success("Admin Login Successful");
    navigate("/admin");
  } catch (error) {
    toast.error(error.response?.data?.message || "Admin Login Failed");
  }
};


  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <div className="text-center">
          <h1
  className="text-4xl font-bold text-green-700 cursor-pointer select-none"
>
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
          <button
  type="button"
  onClick={handleAdminLogin}
  className="w-full mt-3 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
>
  Admin Login
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
      {showPopup && (
  <WelcomePopup
    title={popupTitle}
    quote={popupQuote}
  />
)}
    </div>
  );
}

export default Login;