const API_BASE_URL = "http://192.168.0.7:5000/edunova";
// const API_BASE_URL = "http://10.0.2.2:5000/edunova"; // Para Android Studio Emulator

const DEFAULT_TIMEOUT = 60000; // 60 segundos

// Función helper para hacer peticiones con timeout
const fetchWithTimeout = async (
  url,
  options = {},
  timeout = DEFAULT_TIMEOUT
) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error("La petición tardó demasiado tiempo");
    }
    throw error;
  }
};

// Función principal para hacer peticiones
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  console.log(`${options.method || "GET"} ${url}`);

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },
  };

  try {
    const response = await fetchWithTimeout(url, {
      ...defaultOptions,
      ...options,
    });

    console.log(`Respuesta: ${response.status} ${response.statusText}`);

    // Leer body como texto primero para evitar errores de parseo cuando el servidor devuelve HTML
    const text = await response.text();
    let data = null;

    if (text) {
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        // No es JSON
        if (!response.ok) {
          // Respuesta de error con cuerpo no-JSON (p.ej. HTML error page). Lanzar error con parte del cuerpo para debugging.
          console.error(`Respuesta no-JSON en ${endpoint}:`, text.slice(0, 1000));
          const err = new Error(`Error ${response.status}: ${text}`);
          err.responseText = text;
          throw err;
        } else {
          // Respuesta OK pero no-JSON: devolver texto crudo
          return text;
        }
      }
    }

    // Si la respuesta no es exitosa y pudimos parsear JSON, usar el message del body si existe
    if (!response.ok) {
      const err = new Error((data && data.message) || `Error ${response.status}`);
      err.response = {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        data,
      };
      throw err;
    }

    // Devolver el JSON parseado (mantener compatibilidad con llamadas existentes)
    return data;
  } catch (error) {
    console.error(`Error en ${endpoint}:`, error.message);
    throw error;
  }
};

// Métodos HTTP
const api = {
  get: (endpoint) => apiRequest(endpoint, { method: "GET" }),

  post: (endpoint, data) =>
    apiRequest(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  patch: (endpoint, data) =>
    apiRequest(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  put: (endpoint, data) =>
    apiRequest(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (endpoint) => apiRequest(endpoint, { method: "DELETE" }),
};

export default api;