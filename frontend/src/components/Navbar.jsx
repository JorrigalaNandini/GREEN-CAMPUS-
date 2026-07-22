import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-green-700 to-emerald-600 text-white shadow-lg">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

        {/* Top Section */}
        <div className="flex justify-between items-center">

          <Link
            to="/home"
            className="text-xl sm:text-2xl font-bold hover:scale-105 transition"
          >
            🌿 Green Campus AI
          </Link>


          {/* Mobile Menu Button */}
          <button
            className="sm:hidden text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>


        {/* Navigation Links */}
        <div
          className={`
          ${
            menuOpen ? "flex" : "hidden"
          }
          sm:flex flex-col sm:flex-row
          items-start sm:items-center
          gap-4 sm:gap-6
          mt-5 sm:mt-0
          font-medium
          `}
        >

          <Link
            to="/home"
            className="hover:text-green-200 transition"
          >
            🏠 Home
          </Link>


          <Link
            to="/report"
            className="hover:text-green-200 transition"
          >
            📝 Report
          </Link>


          <Link
            to="/analytics"
            className="hover:text-green-200 transition"
          >
            📊 Analytics
          </Link>


          <Link
            to="/profile"
            className="hover:text-green-200 transition"
          >
            👤 Profile
          </Link>


          {/* Show Admin only for admin */}
          {role === "admin" && (
            <Link
              to="/admin"
              className="hover:text-green-200 transition"
            >
              🛠 Admin
            </Link>
          )}



          <button
            onClick={handleLogout}
            className="
            bg-red-500
            px-5
            py-2
            rounded-full
            hover:bg-red-600
            transition
            w-full
            sm:w-auto
            "
          >
            🚪 Logout
          </button>


        </div>


      </div>

    </nav>
  );
}

export default Navbar;