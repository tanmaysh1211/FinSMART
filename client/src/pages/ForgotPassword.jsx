import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
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
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [showRules, setShowRules] = useState(false);

  const [fieldError, setFieldError] = useState("");

   const rules = checkPasswordRules(newPassword);

  const handleSubmit = async () => {
    setFieldError("");

    if (!email || !newPassword || !confirmPassword) {
      setError("Fill all details");
      return;
    }

    if (newPassword !== confirmPassword) {
      setFormError("Password don't match");
      return;
    }

    if (!isPasswordValid(newPassword)) {
        setFormError("Password does not meet requirements");
    return;
    }

    // navigate(`/login?email=${encodeURIComponent(email)}`);

     try {
    await api.post("/auth/reset-password", { email, newPassword});
    navigate(`/login?email=${encodeURIComponent(email)}`);
  } catch (err) {
    setFormError(
      err.response?.data?.message || "Password reset failed"
    );
  }
  };

  const generatePassword = () => {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const special = "@";

  const all = upper + lower + numbers + special;

  let password =
    upper[Math.floor(Math.random() * upper.length)] +
    lower[Math.floor(Math.random() * lower.length)] +
    numbers[Math.floor(Math.random() * numbers.length)] +
    "@";

  for (let i = password.length; i < 10; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }

  setNewPassword(password);
    setConfirmPassword("");
    setShowPassword(true);
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

          {/* New Password */}
        <div className="mt-4 relative">
          <label>New Password</label>

          <div className="relative mt-2">
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword} 
            placeholder="••••••••"
   className="w-full mt-2 h-[44px] sm:h-[40px] px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-grey-500"
            onFocus={() => setShowRules(true)}
            onBlur={() => setShowRules(false)}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {fieldError && !password && (
                      <p className="text-sm text-red-500 mt-1">{fieldError}</p>
          )}
          
           {/* Generate + Eye */}
              <div className="absolute right-3 top-1/2 -translate-y-1/3 flex items-center gap-5">
                <button
                  type="button"
                  onClick={generatePassword}
            className="text-m font-bold mr-6 text-indigo-600 hover:text-indigo-800 flex items-center justify-center h-6">
                    Gen
                </button>
          
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 hover:text-gray-700 flex items-center justify-center h-6"
                >
                
                </button>
                </div>
                </div>
          
                    {/* Password rules */}
                    {showRules && <PasswordRules rules={rules} />}
                </div>



        <div className="mt-4">
          <label>Confirm New Password</label>

           <div className="relative mt-2">
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword} 
            placeholder="••••••••"
            className="w-full mt-2 h-[44px] sm:h-[40px] px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-grey-500"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {fieldError && !confirmPassword && (
              <p className="text-sm text-red-500 mt-1">{fieldError}</p>
          )}
          
           {/* Generate + Eye */}
              <div className="absolute right-3 top-1/2 -translate-y-1/3 flex items-center gap-5">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 hover:text-gray-700 flex items-center justify-center h-6"
                >
  
                </button>
                </div>
          ``
                </div>
               </div>

        {formError && (
          <p className="text-red-600 text-sm mt-2">{formError}</p>
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
