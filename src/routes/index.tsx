import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import User from "../Components/User";
// import History from "../Components/History";
// import Bot from "../Components/Bot";
// import Login from "../Components/Login";
// import StatusTable from "../Components/Status/StatusTable";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider, useAuth } from "./AuthContext";
import AddUser from "../components/addUser";
import AddCollection from "../components/addCollection";
import Stats from "../components/stats";

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/status-overview" replace /> : <Login />
            }
          /> */}
          {/* <Route
            path="/status-overview"
            element={<ProtectedRoute element={<StatusTable />} />}
          />
          <Route path="/all-users" element={<ProtectedRoute element={<User />} />} />
          <Route path="/all-bots" element={<ProtectedRoute element={<Bot />} />} />
          <Route
            path="/status-history"
            element={<ProtectedRoute element={<History />} />}
          /> */}
          <Route
            path="/"
            element={
              //   isAuthenticated ? (
              //     <Navigate to="/add-user" replace />
              //   ) : (
              //     <AddUser />
              //   )
              <AddUser />
            }
          />

          <Route path="/stats" element={<Stats />} />
          <Route path="/addCollection" element={<AddCollection />} />

          <Route
            path="*"
            element={
              <Navigate to={isAuthenticated ? "/add-user" : "/"} replace />
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
