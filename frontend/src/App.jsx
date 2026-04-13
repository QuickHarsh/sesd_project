import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import { container } from "./config/dependencies";
import { AppLayout } from "./layouts/AppLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { HistoryPage } from "./pages/HistoryPage";
import { AuthPage } from "./pages/AuthPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";

function App() {
  const restoredSession = useMemo(
    () => container.authUseCase.restoreSession(),
    [],
  );
  const [session, setSession] = useState(restoredSession);

  const handleLogout = useCallback(() => {
    container.authUseCase.clearSession();
    setSession(null);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <PublicRoute isAuthenticated={Boolean(session?.token)}>
              <AuthPage
                authUseCase={container.authUseCase}
                onAuthenticated={setSession}
              />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={Boolean(session?.token)}>
              <AppLayout user={session?.user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        >
          <Route
            path="/"
            element={
              <DashboardPage
                dashboardUseCase={container.dashboardUseCase}
                onAuthError={handleLogout}
              />
            }
          />
          <Route
            path="/history"
            element={
              <HistoryPage
                expenseUseCase={container.expenseUseCase}
                onAuthError={handleLogout}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
