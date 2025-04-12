import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await actions.logout(); // Llama a la acción de logout
      navigate("/login"); // Redirige al usuario a la página de login
      alert("Has cerrado sesión correctamente.");
    } catch (error) {
      console.error("Error en el logout:", error);
      alert("Ocurrió un error al cerrar sesión. Inténtalo de nuevo.");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Mi App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/myspace">
                Mi Espacio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/help">
                Ayuda
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            {store.user ? ( 
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Cerrar sesión
              </button>
            ) : (
              <Link className="btn btn-outline-light" to="/login">
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};