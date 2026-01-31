// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Transactions from "./pages/Transactions";
// import Profile from "./pages/Profile";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Navbar from "./components/Navbar";
// import Chatbot from "./pages/Chatbot";
// import { AuthProvider } from "./context/AuthContext";
// import Register from "./pages/Register";
// import Landing from "./pages/Landing";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/" element={ <Landing />}/>
//         <Route path="/dashboard" element={ <Dashboard />}/>
//         <Route path="/transactions" element={ <ProtectedRoute> <Transactions /></ProtectedRoute>}/>
//         <Route path="/register" element={<Register />} />
//         <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
//         <Route path="/chatbot" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;




// import { Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Transactions from "./pages/Transactions";
// import Profile from "./pages/Profile";
// import ProtectedRoute from "./components/ProtectedRoute";
// // import Chatbot from "./pages/Chatbot";
// import Register from "./pages/Register";
// import Landing from "./pages/Landing";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Landing />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/transactions"
//         element={
//           <ProtectedRoute>
//             <Transactions />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/profile"
//         element={
//           <ProtectedRoute>
//             <Profile />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/chatbot"
//         element={
//           <ProtectedRoute>
//             <Chatbot />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// }

// export default App;





import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import { AuthProvider } from "./context/AuthContext";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/transactions" element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;





