import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { PatientProvider } from '@/contexts/PatientContext';
import { Header } from '@/components/Header';
import LoginPage from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { PatientOverviewPage } from '@/pages/PatientOverviewPage';
import { QMLInsightsPage } from '@/pages/QMLInsightsPage';
import { PatientTrendsPage } from '@/pages/PatientTrendsPage';
import { XRayAnalysisPage } from '@/pages/XRayAnalysisPage';
import { ClinicalNotesPage } from '@/pages/ClinicalNotesPage';
import { QMLEnginePage } from '@/pages/QMLEnginePage';
import { QMLCircuitPage } from '@/pages/QMLCircuitPage';
import { TBBenchmarksPage } from '@/pages/TBBenchmarksPage';
import { QMLEdaPage } from '@/pages/QMLEdaPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[#f5f2ed]">
      {isAuthenticated && <Header />}
      <main className={isAuthenticated ? 'pt-[68px]' : ''}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          {/* Standalone Feature Pages (Publicly accessible from landing page) */}
          <Route path="/qml-engine" element={<QMLEnginePage />} />
          <Route path="/qml-circuit" element={<QMLCircuitPage />} />
          <Route path="/tb-benchmarks" element={<TBBenchmarksPage />} />
          <Route path="/qml-eda" element={<QMLEdaPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/qml"
            element={
              <ProtectedRoute>
                <QMLInsightsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/xray"
            element={
              <ProtectedRoute>
                <XRayAnalysisPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trends"
            element={
              <ProtectedRoute>
                <Navigate to="/patient/PT-1001/trends" replace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <ClinicalNotesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/:id"
            element={
              <ProtectedRoute>
                <PatientOverviewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/:id/qml"
            element={
              <ProtectedRoute>
                <QMLInsightsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/:id/trends"
            element={
              <ProtectedRoute>
                <PatientTrendsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/:id/xray"
            element={
              <ProtectedRoute>
                <XRayAnalysisPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/:id/notes"
            element={
              <ProtectedRoute>
                <ClinicalNotesPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PatientProvider>
        <AppRoutes />
      </PatientProvider>
    </AuthProvider>
  );
}
