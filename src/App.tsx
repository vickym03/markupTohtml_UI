import React from "react";
import AppRoutes from "./routes";
import { AuthProvider } from "./routes/AuthContext";
import Navigation from "./navigation";
import useLoading from "./templates/loading";

const App = () => {
  const { Loading } = useLoading();

  return (
    <AuthProvider>
      <Loading />
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
