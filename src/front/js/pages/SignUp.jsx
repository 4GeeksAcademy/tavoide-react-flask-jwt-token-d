import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    setError("");

    const payload = { username, email, password };

    try {
      const response = await actions.signup(payload);

      if (response && response.message) {
        alert(response.message);
        navigate("/login");
      } else {
        setError("Error al registrarse. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      setError("Ocurrió un error al registrarse. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="container-fluid bg-light" style={{ minHeight: "100vh", background: "linear-gradient(to right,rgb(56, 19, 192),rgb(15, 111, 190))" }}>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="card p-4 shadow-lg rounded-4" style={{ width: "100%", maxWidth: "400px" }}>
          <h2 className="card-title text-center mb-4">Regístrate</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Nombre de usuario</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-person"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Nombre de usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-envelope"></i>
                </span>
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
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-lock"></i>
                </span>
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
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100">Registrarse</button>
          </form>

          <div className="text-center mt-3">
            ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;