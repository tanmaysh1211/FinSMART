import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";
import { checkPasswordRules, isPasswordValid } from "../utils/passwordRules";
import PasswordRules from "../components/PasswordRules";


export default function ForgotPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const initialEmail = params.get("email") || "";

  const [email, setEmail] = useState(initialEmail);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showRules, setShowRules] = useState(false);

   const rules = checkPasswordRules(newPassword);

  const handleSubmit = async () => {
    setError("");

    if (!email || !newPassword || !confirmPassword) {
      setError("Fill all details");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Password don't match");
      return;
    }

    if (!isPasswordValid(newPassword)) {
        setError("Password does not meet requirements");
    return;
    }

    // navigate(`/login?email=${encodeURIComponent(email)}`);

     try {
    await api.post("/auth/reset-password", {
      email,
      newPassword,
    });

    navigate(`/login?email=${encodeURIComponent(email)}`);
  } catch (err) {
    setError(
      err.response?.data?.message || "Password reset failed"
    );
  }
  };

  return (
    <div className="min-h-screen bg-[#DCE6FF] flex items-center justify-center">
      <div className="w-full max-w-[420px] bg-[#EDF2FF] rounded-2xl shadow-xl px-6 sm:px-8 py-6 sm:py-8">
        <button
          onClick={() =>
            navigate(`/login?email=${encodeURIComponent(email)}`)
          }
          className="mb-6 text-sm text-indigo-600 hover:underline"
        >
          ← Back to Login
        </button>

        <h2 className="text-3xl font-bold text-center text-indigo-600">
          Reset Password
        </h2>

        <div className="mt-6">
          <label>Email</label>
          <input
            className="w-full mt-2 h-[44px] sm:h-[40px] px-4 rounded-xl border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label>New Password</label>
          <input
            type="password"
            className="w-full mt-2 h-[44px] sm:h-[40px] px-4 rounded-xl border"
            onFocus={() => setShowRules(true)}
            onBlur={() => setShowRules(false)}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {showRules && <PasswordRules rules={rules} />}
        </div>

        <div className="mt-4">
          <label>Confirm New Password</label>
          <input
            type="password"
            className="w-full mt-2 h-[44px] sm:h-[40px] px-4 rounded-xl border"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm mt-2">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full mt-6 h-[44px] rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
