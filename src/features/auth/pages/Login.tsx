import { useState } from "react";
import { useAuth } from "../../../hooks/useAuthHub";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login({ userName, password });
      navigate('/schoolclasses');
    } catch (e) {
      console.error("Login mal:", e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-4">
          <h1 className="text-blue-600 text-4xl mb-1">Wizer</h1>
          <h2 className="text-gray-600 text-2xl">Iniciar Sesión</h2>
        </div>

        <div className="bg-white rounded-2xl p-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-600 md-2">
              Bienvenido de vuelta
            </h3>
            <p className="text-gray-500">
              Ingresa tus credenciales para acceder a tu cuenta
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nombre de usuario
              </label>
              <input
                type="text"
                id="username"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="usuario123"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="******"
                required
                disabled={loading}
              />
            </div>

            <div className="flex justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 border-gray-300 rounded"
                  disabled={loading}
                />
                <label
                  htmlFor="remember"
                  className="mx-2 block text-sm text-gray-700"
                >
                  Recordarme
                </label>
              </div>
              <a
                href=""
                className="text-sm text-blue-600 hover:text-blue-500 font-medium"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-3 rounded-lg"
            >
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </form>

          <div className="text-center mt-5">
            <p className="text-gray-600">
              ¿No tienes una cuenta?
              <a
                href=""
                className="text-blue-600 hover:text-blue-500 font-semibold"
              >
                Regístrate aquí
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
