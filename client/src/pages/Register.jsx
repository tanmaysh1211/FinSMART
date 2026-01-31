import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { checkPasswordRules, isPasswordValid } from "../utils/passwordRules";
import PasswordRules from "../components/PasswordRules";

const Spinner = () => (
  <div className="w-2 h-2 border-2 border-black border-t-transparent rounded-full animate-spin" />
);

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showRules, setShowRules] = useState(false);

  const [fieldError, setFieldError] = useState("");

  const [formError, setFormError] = useState("");

  const rules = checkPasswordRules(password);
  const allRulesPassed = Object.values(rules).every(Boolean);

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {

    setFieldError("");

    if (!name || !email || !password) {
      setFieldError("Fill the details");
      return;
    }

    //  password rules validation
    if (!isPasswordValid(password)) {
      setFormError("Password does not meet requirements");
      return;
    }

    if (email !== email.toLowerCase()) {
      setFormError("Email must be lowercase only");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/register", { name, email, password });
      navigate("/login");
    } catch(err) {
      // setFormError("Registration failed");
      if (err.response?.status === 409) {
      setFormError("User Exists. Cannot be Re-Registered");
    } else if (err.response?.status === 400) {
      setFormError(err.response.data.message);
    } else {
      setFormError("Registration failed");
    }
    }finally{
      setLoading(false);
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

  setPassword(password);
  setShowPassword(true); // show generated password
};

  // const Rule = ({ ok, text }) => (
  //   <p className={`flex items-center gap-2 text-sm ${ok ? "text-green-600" : "text-red-500"}`}>
  //     {ok ? "✓" : "✕"} {text}
  //   </p>
  // );

   const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_GOOGLE_AUTH_URL;
  };

  return (
    <div className="min-h-screen bg-[#DCE6FF] flex items-center justify-center relative px-4">

      {/* Back to Home */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-3 left-3 text-sm font-bold text-gray-600 hover:text-indigo-600 
        flex items-center gap-1"
      >
        ← Back to Home
      </button>

      {/* Card */}
      <div className="w-full max-w-[420px] bg-[#EDF2FF] rounded-2xl shadow-xl px-6 sm:px-8 py-4 sm:py-6">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          {/* <span className="text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base">FS</span> */}
          <span className="text-white font-bold text-lg">FS</span>
        </div>
        </div>

        {/* Title */}
        <h2 className="mt-2 text-center text-indigo-600 text-2xl sm:text-3xl font-bold">
          FinSmart
        </h2>
        <p className="text-center text-lg sm:text-xl font-extrabold mt-4">
          Create an Account
        </p>
        <p className="text-center text-gray-500 mt-2 text-sm">
          Join PocketGuard to start your financial journey
        </p>

        {/* Form */}
        <div className="mt-8">
          <label className="text-m font-extrabold text-gray-700">
            Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className="mt-2 w-full h-[40px] px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-grey-500"
            onChange={(e) => setName(e.target.value)}
          />
          </div>

          {fieldError && !name && (
            <p className="text-sm text-red-500 mt-1">{fieldError}</p>
          )}

          <div className="mt-4">
          <label className="text-m font-extrabold text-gray-700 mt-5 block">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="mt-2 w-full h-[40px] px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-grey-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>
          {fieldError && !email && (
            <p className="text-sm text-red-500 mt-1">{fieldError}</p>
          )}

          <div className="mt-4 relative">
          <label className="text-m font-extrabold text-gray-700 mt-5 block">
            Password
          </label>

          <div className="relative mt-2">
          <input
            type={showPassword ? "text" : "password"}
            value={password} 
            placeholder="••••••••"
            className="mt-2 w-full h-[44px] px-4 pr-24 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-grey-500"
            onFocus={() => setShowRules(true)}
            onBlur={() => setShowRules(false)}
            onChange={(e) => setPassword(e.target.value)}
          />

          {fieldError && !password && (
            <p className="text-sm text-red-500 mt-1">{fieldError}</p>
          )}

 {/* Generate + Eye */}
    <div className="absolute right-3 top-1/2 -translate-y-1/3 flex items-center gap-5">
      <button
        type="button"
        onClick={generatePassword}
        className="text-lg font-bold text-indigo-600 hover:text-indigo-800 flex items-center justify-center h-6"> Gen
      </button>

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="text-gray-500 hover:text-gray-700 flex items-center justify-center h-6"
      >
        {showPassword ? "🙈" : "👁️"}
      
      </button>
      </div>

          {/* Password rules */}
          {showRules && <PasswordRules rules={rules} />}

          </div>
        </div>

          {/* Create Account */}
          <button onClick={handleRegister} disabled={loading}
            className={`w-full mt-6 h-[44px] rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 
                       font-semibold text-black flex items-center justify-center transition-all duration-300
                        ${loading ? "opacity-70 cursor-not-allowed": 
                          "hover:from-indigo-600 hover:to-purple-700 hover:shadow-lg"}`} >
                  {loading ? <Spinner /> : "Create Account"}
                  </button>

            {formError && (<p className="text-sm text-red-600 mt-3 text-center font-medium">{formError}</p>)}

          {/* Login link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-600 cursor-pointer font-medium hover:text-indigo-800">
              Sign in
            </span>
          </p>

          {/* Google */}
          <button
            onClick={handleGoogleLogin}
            className="mt-5 w-full flex items-center justify-center sm:justify-between gap-3 px-4 py-2 border rounded-xl shadow-sm hover:bg-gray-50"
          >
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="text-sm font-medium">
                Sign in as tanmay
              </span>
            </div>
            <span className="text-gray-500">⌄</span>
          </button>
        </div>
      </div>
  );
}
