"use client";
import { createContext, useContext, useState, useEffect } from "react";

interface PlatformContextType {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  userType: "student" | "parent" | null;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export function PlatformProvider({ children }: { children: React.ReactNode }) {
  // Lazy initializer – reads localStorage once
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("platformAuth");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.isLoggedIn || false;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        return false;
      }
    }
    return false;
  });

  const [userType, setUserType] = useState<"student" | "parent" | null>(() => {
    if (typeof window === "undefined") return null;
    const saved = localStorage.getItem("platformAuth");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.userType || null;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // Sync to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("platformAuth", JSON.stringify({ isLoggedIn, userType }));
  }, [isLoggedIn, userType]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = async (email: string, _password: string): Promise<boolean> => {
    // In production, call your School Platform API
    // Demo: check email for "student" or "parent"
    if (email.includes("student")) {
      setIsLoggedIn(true);
      setUserType("student");
      return true;
    } else if (email.includes("parent")) {
      setIsLoggedIn(true);
      setUserType("parent");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserType(null);
  };

  return (
    <PlatformContext.Provider value={{ isLoggedIn, login, logout, userType }}>
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error("usePlatform must be used within a PlatformProvider");
  }
  return context;
}