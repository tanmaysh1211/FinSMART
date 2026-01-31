import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { logout } = useAuth();

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Profile</h2>
      <button
        onClick={logout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
