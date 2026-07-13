import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [showUser, setShowUser] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth) return null;
  const { user, logout } = auth;

  const name = typeof user?.name === "string" ? user.name : "";
  const email = typeof user?.email === "string" ? user.email : "";
  const firstLetter = name ? name.charAt(0).toUpperCase() : "U";

  return (
    <>
      <nav className="sticky top-0 z-50 bg-slate-100 shadow px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          <div
            className="text-lg sm:text-xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            FinSmart 💸
          </div>
          <div className="flex items-center gap-2 sm:gap-3">

            <button
              onClick={() => navigate("/chatbot")}
              className="flex items-center gap-2 bg-slate-800 text-white px-3 py-2 rounded text-sm font-medium hover:bg-slate-700 transition-colors"
            >
              🤖 <span className="hidden sm:inline">Get AI Insights!</span>
              <span className="sm:hidden">AI</span>
            </button>
            <div
              className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded cursor-pointer hover:bg-indigo-700 transition-colors"
              onClick={() => setShowUser(true)}
            >
              👤 {name || "User"}
            </div>
          </div>
        </div>
      </nav>

      {showUser && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setShowUser(false)}
        >
          <div
            className="bg-white rounded-xl w-[340px] p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-semibold text-lg">User Info</h3>
              <button
                className="text-gray-400 hover:text-black"
                onClick={() => setShowUser(false)}
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-semibold">
                {firstLetter}
              </div>
              <div>
                <p className="font-medium">{name || "Unknown User"}</p>
                <p className="text-sm text-gray-500">{email || "—"}</p>
              </div>
            </div>

            <button
              onClick={() => { logout(); navigate("/"); }}
              className="flex items-center gap-2 text-sm bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition-colors"
            >
              Logout
              <span className="text-lg">⎋</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
