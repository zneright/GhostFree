// ============================================
// GhostFree — Root Application Component
// ============================================

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { MidnightWalletProvider } from "./contexts/MidnightWalletContext";
import AppRoutes from "./routes/AppRoutes";
import FeedbackWidget from "./components/FeedbackWidget";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MidnightWalletProvider>
          <AppRoutes />
          <FeedbackWidget />
        </MidnightWalletProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
