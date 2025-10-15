const API_BASE_URL = "http://192.168.10.109:5000/edunova";
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

    // Parsear JSON
    const data = await response.json();

    // Crear objeto con status y datos
    const result = {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      data: data,
      // Para mantener compatibilidad con código existente
      ...data
    };

    // Si la respuesta no es exitosa, lanzar error
    if (!response.ok) {
      const error = new Error(data.error || data.message || `Error ${response.status}`);
      error.response = result;
      throw error;
    }

    return result;
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