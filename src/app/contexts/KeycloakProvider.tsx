"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Keycloak, { KeycloakConfig } from "keycloak-js";
import Loading from "@/components/Loading";  // Assumindo que você tem um componente Loading

interface AuthContextType {
  keycloak: Keycloak | null;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const keycloakConfig: KeycloakConfig = {
  url: "http://localhost:8080/",
  realm: "COREN",
  clientId: "COREN-stock-frontend",
};

export const KeycloakProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const kc = new Keycloak(keycloakConfig);

    kc.init({ onLoad: "login-required", pkceMethod: "S256" })
      .then((auth) => {
        console.log("Keycloak autenticado?", auth);
        console.log("Token:", kc.token);

        setKeycloak(kc);
        setIsAuthenticated(auth);
        setLoading(false);  // Autenticação concluída
      })
      .catch(() => {
        console.error("Falha na autenticação");
        setLoading(false);  // Mesmo em caso de erro, podemos parar o loading
      });
  }, []);

  const logout = () => {
    if (keycloak) {
      keycloak.logout({ redirectUri: "http://localhost:3000/" });
    }
  };

  if (loading) {
    return (<Loading />);
  }

  return (
    <AuthContext.Provider value={{ keycloak, isAuthenticated, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um KeycloakProvider");
  }
  return context;
};
