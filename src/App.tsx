// ============================================
// GhostFree — Root Application Component
// ============================================

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { MidnightWalletProvider } from "./contexts/MidnightWalletContext";
import { TransactionProvider } from "./contexts/TransactionContext";
import AppRoutes from "./routes/AppRoutes";
import FeedbackWidget from "./components/FeedbackWidget";
import AccessibilityToggle from "./components/AccessibilityToggle";
import TxToastManager from "./components/TxToastManager";
import { ErrorBoundary } from "./components/ErrorBoundary";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MidnightWalletProvider>
          <TransactionProvider>
            <ErrorBoundary>
              <AppRoutes />
            </ErrorBoundary>
            <FeedbackWidget />
            <AccessibilityToggle />
            <TxToastManager />
          </TransactionProvider>
        </MidnightWalletProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
