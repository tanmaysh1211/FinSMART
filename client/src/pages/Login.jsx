// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import api from "../services/api";

// export default function Login() {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleGoogleLogin = () => {
//   window.location.href = import.meta.env.VITE_GOOGLE_AUTH_URL;
// };

//   const handleLogin = async () => {
//     const res = await api.post("/auth/login", { email, password });
//     login(res.data.token);
//     navigate("/dashboard");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="bg-white p-6 rounded w-80">
//         <h2 className="text-xl font-bold mb-4">Login</h2>

//         <input
//           className="border p-2 w-full mb-3"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           className="border p-2 w-full mb-4"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           className="bg-indigo-600 text-white w-full py-2 rounded"
//           onClick={handleLogin}
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import api from "../services/api";

// export default function Login() {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleGoogleLogin = () => {
//     window.location.href = import.meta.env.VITE_GOOGLE_AUTH_URL;
//   };

//   const handleLogin = async () => {
//     const res = await api.post("/auth/login", { email, password });
//     login(res.data.token);
//     navigate("/dashboard");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-6 rounded w-80 shadow">
//         <h2 className="text-xl font-bold mb-4">Login</h2>

//         <input
//           className="border p-2 w-full mb-3"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           className="border p-2 w-full mb-4"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           className="bg-indigo-600 text-white w-full py-2 rounded mb-3"
//           onClick={handleLogin}
//         >
//           Login
//         </button>

//         <button
//           className="border w-full py-2 rounded flex justify-center items-center gap-2"
//           onClick={handleGoogleLogin}
//         >
//           <img
//             src="https://developers.google.com/identity/images/g-logo.png"
//             className="w-5"
//           />
//           Continue with Google
//         </button>
//       </div>
//     </div>
//   );
// }










// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";

// export default function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//     const handleGoogleLogin = () => {
//     window.location.href = import.meta.env.VITE_GOOGLE_AUTH_URL;
//   };
//   const handleLogin = async () => {
//     const res = await api.post("/auth/login", { email, password });
//     localStorage.setItem("token", res.data.token);
//     navigate("/dashboard");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-100">
//       <div className="bg-white p-8 rounded w-80 shadow">
//         <h2 className="text-xl font-bold mb-4">Login</h2>

//         <input
//           className="border p-2 w-full mb-3"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           className="border p-2 w-full mb-4"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           className="bg-indigo-600 text-white w-full py-2 rounded"
//           onClick={handleLogin}
//         >
//           Login
//         </button>

//         <p className="text-sm mt-4 text-center">
//           No account?{" "}
//           <span
//             className="text-indigo-600 cursor-pointer"
//             onClick={() => navigate("/register")}
//           >
//             Register
//           </span>

//            <button
//           className="border w-full py-2 rounded flex justify-center items-center gap-2"
//           onClick={handleGoogleLogin}
//         >
//           <img
//             src="https://developers.google.com/identity/images/g-logo.png"
//             className="w-5"
//           />
//           Continue with Google
//         </button>
//         </p>
//       </div>
//     </div>
//   );
// }














import { useState, useEffect } from "react";
import { useNavigate , useLocation , useSearchParams } from "react-router-dom";
console.log("LOGIN VERSION A");
import api from "../services/api";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import googleIcon from "../assets/google.png";

const Spinner = () => (
  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
);

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { setUser } = useAuth();
  
  const [fieldError, setFieldError] = useState("");
  const [authError, setAuthError] = useState("");

  const [loading, setLoading] = useState(false);

  const [params] = useSearchParams();

  useEffect(() => {
    const emailFromQuery = params.get("email");
    if (emailFromQuery) {
      setEmail(emailFromQuery);
    }
  }, []);

  useEffect(() => {
  if (location.state?.email) {
    setEmail(location.state.email);
  }
}, [location.state]);


//   useEffect(() => {
//   if (window.google?.accounts?.id) {
//     window.google.accounts.id.cancel();
//     window.google.accounts.id.disableAutoSelect();
//   }
// }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

  //   if (token) {
  //     localStorage.setItem("token", token);
  //     api.get("/auth/me").then(res => {
  //       setUser(res.data);
  //       navigate("/dashboard");
  //     });
  //   }
  // }, []);



    if (token) {
    //  Save token
    localStorage.setItem("token", token);

    //  Clean URL
    window.history.replaceState({}, "", "/dashboard");

    //  Set user async (non-blocking)
    api.get("/auth/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        // even if this fails, user is logged in
      });

    // 4️Navigate immediately
    navigate("/dashboard", { replace: true });
    }
  }, [navigate, setUser]);

    const handleGoogleLogin = () => {
      window.location.href = import.meta.env.VITE_GOOGLE_AUTH_URL;
    };


  // const handleLogin = async () => {
  //   try {
  //     const res = await api.post("/auth/login", { email, password });
  //     localStorage.setItem("token", res.data.token);
  //     navigate("/dashboard");
  //   } catch (err) {
  //     alert("Invalid credentials");
  //   }
  // };

  const handleLogin = async () => {

    setFieldError("");
    setAuthError("");
    
    if (!email || !password) {
      setFieldError("Fill the details");
      return;
    }
    
    try {
      setLoading(true);
     const res = await api.post("/auth/login", { email: email.toLowerCase(), password });

    //  save TOKEN
      localStorage.setItem("token", res.data.token);

      // 3. Fetch user
    const me = await api.get("/auth/me");
    setUser(me.data);

    // 4. Navigate
    navigate("/dashboard", { replace: true });
    
      // navigate("/dashboard");
    } catch {
      // 3️⃣ Invalid credentials
      setAuthError(
        "Invalid credentials. Please make sure you are registered."
      );
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  bg-[#DCE6FF] flex items-center justify-center relative">

      {/* Back to Home */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-3 left-3 sm:top-6 sm:left-6 text-sm sm:text-base font-semibold text-gray-700 hover:text-indigo-600 flex items-center gap-2"
      >
        ← Back to Home
      </button>

      {/* Card */}
      <div className="w-full max-w-[450px] bg-[#EDF2FF] rounded-2xl shadow-xl px-6 sm:px-8 py-6 sm:py-10">

        {/* Logo */}
        <div className="flex justify-center mb-6 ">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <span className="text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base">FS</span>
        </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-indigo-600 text-2xl sm:text-4xl font-bold">
          FinSmart
        </h2>
        <p className="text-center text-2xl font-extrabold mt-3">
          Welcome Back
        </p>
        <p className="text-center text-gray-500 mt-2 text-sm">
          Sign in to access your financial dashboard
        </p>

        {/* Form */}
        <div className="mt-8">
          <label className="text-m font-extrabold text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            placeholder="you@example.com"
   className="mt-2 w-full h-[44px] sm:h-[40px] px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-grey-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          {fieldError && !email && (
            <p className="text-sm text-red-500 mt-1">{fieldError}</p>
          )}
          </div>

           <div className="mt-4">
          <label className="text-m font-extrabold text-gray-700 mt-5 block">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="mt-1 w-full h-[40px] px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-grey-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          {fieldError && !password && (
            <p className="text-sm text-red-500 mt-1">{fieldError}</p>
          )}
        </div>

        {/* <div className="flex justify-end mt-2">
  <span
    onClick={() => 
      navigate("/forgot-password", { state: { email } })}
    className="text-sm text-indigo-600 cursor-pointer hover:underline"
  >
    Forgot password ?
  </span>
</div> */}


<button
  type="button"
  className="mt-2 text-sm text-indigo-600 hover:underline self-end"
  onClick={() =>
    navigate(`/forgot-password?email=${encodeURIComponent(email)}`)
  }
>
  Forgot password ?
</button>

          {/* Sign In */}
          <button
  onClick={handleLogin}
  disabled={loading}
  className={`w-full mt-6 py-2 rounded-xl text-white font-semibold 
    bg-gradient-to-r from-indigo-500 to-purple-600
    transition-all duration-300
    ${loading ? "opacity-70 cursor-not-allowed" : "hover:from-indigo-600 hover:to-purple-700 hover:shadow-lg"}
  `}
>
  {loading ? <Spinner /> : "Sign In"}
</button>


          {/* Auth error */}
        {authError && (
          <p className="text-sm text-red-600 mt-3 text-center">
            {authError}
          </p>
        )}

          {/* Register */}
          <p className="text-center text-sm text-gray-600 mt-8">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-indigo-600 cursor-pointer font-medium hover:text-indigo-800">
              Sign up
            </span>
          </p>

          {/* Google */}
      {/* <button onClick={handleGoogleLogin} */}
        {/* className="mt-5 w-full flex items-center justify-between px-4 py-2 border rounded-xl shadow-sm hover:bg-gray-50"> */}
          {/* <div className="flex items-center gap-3"> */}
        {/* <div className="w-5 h-5 flex items-center justify-center overflow-hidden">
          <img
            src={googleIcon}
            alt="Google"
            style={{ width: "20px", height: "20px", maxWidth: "20px", maxHeight: "20px" }}
          />
        </div> */}
        {/* <span className="text-sm font-medium truncate max-w-[180px]"> */}
          {/* Continue as Google User */}
        {/* </span> */}
      {/* </div> */}
        {/* <span className="text-gray-500 text-sm">⌄</span> */}
      {/* </button> */}


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

