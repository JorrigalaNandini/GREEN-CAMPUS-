import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-green-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          🌿 Green Campus AI
        </h1>

        <div className="flex gap-6 font-medium">

          <Link to="/home" className="hover:text-green-200">
            Home
          </Link>

          <Link to="/report" className="hover:text-green-200">
            Report Issue
          </Link>

          <Link to="/analytics" className="hover:text-green-200">
            Analytics
          </Link>

          <Link to="/profile" className="hover:text-green-200">
            Profile
          </Link>

          <Link to="/admin" className="hover:text-green-200">
            Admin
          </Link>

          <button
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;