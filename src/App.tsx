import { AuthProvider } from "./context/AuthProvider";
import { UserRoutes } from "./components/UserRoutes";

function App() {
  return (
    <AuthProvider>
      <UserRoutes />
    </AuthProvider>
  );
}

export default App;
