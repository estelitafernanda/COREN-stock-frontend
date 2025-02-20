import axios from "axios";
import { useAuth } from "@/app/contexts/KeycloakProvider";
import { useEffect } from "react";

// instância do axios
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// hook para adicionar token nas requisições
export const useApiWithAuth = () => {
  const { keycloak } = useAuth();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(async (config) => {
      if (keycloak?.token) {
        // verifica se o token expirou, se sim ele cria outro
        if (keycloak.isTokenExpired()) {
          try {
            await keycloak.updateToken(30);
          } catch (error) {
            console.error("Falha ao atualizar o token:", error);
            keycloak.logout();
            return Promise.reject(error);
          }
        }

        config.headers.Authorization = `Bearer ${keycloak.token}`;
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [keycloak]);

  return api;
};

export default api;
