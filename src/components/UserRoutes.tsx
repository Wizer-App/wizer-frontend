import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../features/auth/pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Header from "../features/schoolClasses/components/header";
import SchoolClassList from "../features/schoolClasses/pages/SchoolClassList";
import Teams from "../features/teams/pages/Teams";
import Activities from "../features/activities/pages/Activities";
import SchoolClassDetail from "../features/schoolClasses/pages/SchoolClassDetail";

export function UserRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/schoolclasses"
          element={
            <ProtectedRoute>
              <Header />
              <SchoolClassList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teams"
          element={
            <ProtectedRoute>
              <Header />
              <Teams />
            </ProtectedRoute>
          }
        />
        <Route
          path="/activities"
          element={
            <ProtectedRoute>
              <Header />
              <Activities />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schoolclasses/:id"
          element={
            <ProtectedRoute>
              <Header />
              <SchoolClassDetail />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
