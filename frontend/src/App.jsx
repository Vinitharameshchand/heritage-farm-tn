import React from "react";
import "./i18n/config";
import AppRouter from "./routes/Router";
import { AuthProvider } from "./contexts/AuthContext";
import SOSButton from "./components/SOSButton";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
      <SOSButton />
    </AuthProvider>
  );
}

export default App;
