import React, { useState, useContext } from "react";
import { Context } from '../store/appContext';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    setError("");

    const payload = {
      email: email,
      password: password,
    };

    try {
      const response = await actions.login(payload);

      if (response && response.token) {
        localStorage.setItem("token", response.token);
        alert("Inicio de sesión exitoso.");
        navigate("/");
      } else {
        setError("Error al iniciar sesión. Verifica tus credenciales.");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      setError("Ocurrió un error al iniciar sesión. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 " style={{ minHeight: "100vh", background: "linear-gradient(to right,rgb(56, 19, 192),rgb(15, 111, 190))" }}>
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="card-title text-center mb-4">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <button type="submit" className="btn btn-primary w-100">
            Iniciar sesión
          </button>
        </form>
        <div className="text-center mt-3">
          ¿No tienes una cuenta? <a href="/signup">Regístrate</a>
        </div>
      </div>
    </div>
  );
};

export default Login;