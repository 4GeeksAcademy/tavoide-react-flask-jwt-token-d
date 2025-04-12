const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		message: null,
		user: null,
	  },
	  actions: {
		logout: async () => {
			try {
			  const token = localStorage.getItem("token"); 
	
			  if (!token) {
				throw new Error("No hay sesión activa.");
			  }
	
			  const resp = await fetch(process.env.BACKEND_URL + "/api/logout", {
				method: "POST",
				headers: {
				  "Content-Type": "application/json",
				  Authorization: `Bearer ${token}`, 
				},
			  });
	
			  const data = await resp.json();
	
			  if (!resp.ok) {
				throw new Error(data.msg || "Error al cerrar sesión.");
			  }
	
			  localStorage.removeItem("token");
	
			  setStore({
				user: null,
			  });
	
			  return data; 
			} catch (error) {
			  console.error("Error en el logout:", error);
			  throw error;
			}
		  },
		getMySpace: async () => {
			try {
			  const token = localStorage.getItem("token"); 
	
			  if (!token) {
				throw new Error("No hay token de autenticación.");
			  }
	
			  const resp = await fetch(process.env.BACKEND_URL + "/api/myspace", {
				method: "GET",
				headers: {
				  "Content-Type": "application/json",
				  Authorization: `Bearer ${token}`,
				},
			  });
	
			  const data = await resp.json();
	
			  if (!resp.ok) {
				throw new Error(data.msg || "Error al obtener los datos del usuario.");
			  }
	
			  setStore({ user: data });
	
			  return data; 
			} catch (error) {
			  console.error("Error en getMySpace:", error);
			  throw error;
			}
		  },
		getMessage: async () => {
		  try {
			const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
			const data = await resp.json();
			setStore({ message: data.message });
			return data;
		  } catch (error) {
			console.log("Error loading message from backend", error);
		  }
		},
		signup: async (payload) => {
		  try {
			const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
			  },
			  body: JSON.stringify(payload),
			});
  
			const data = await resp.json();
  
			if (!resp.ok) {
			  throw new Error(data.message || "Error al registrarse.");
			}
  
			return data;
		  } catch (error) {
			console.error("Error en el registro:", error);
			throw error;
		  }
		},
		login: async (payload) => {
		  try {
			const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
			  },
			  body: JSON.stringify(payload),
			});
  
			const data = await resp.json();
  
			if (!resp.ok) {
			  throw new Error(data.message || "Error al iniciar sesión.");
			}
  
			return data;
		  } catch (error) {
			console.error("Error en el inicio de sesión:", error);
			throw error;
		  }
		},
	  },
	};
  };
  
  export default getState;