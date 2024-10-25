import { createContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { api } from "../axiosConfig";

interface AuthState {
  fio: string | null;
  email: string | null;
  role: string | null;
}

interface AuthContextType {
  auth: AuthState;
  setAuth: Dispatch<SetStateAction<AuthState>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => {
    if (typeof window !== "undefined") {
      // Retrieve auth data from localStorage only on the client side
      const savedAuth = localStorage.getItem("auth");
      return savedAuth ? JSON.parse(savedAuth) : { fio: null, email: null, role: null };
    }
    // Default state for SSR, which will be updated on the client
    return { fio: null, email: null, role: null };
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await api.get("/auth/authCheck");
        console.log("Response:", res.data);
        setAuth(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch user data if auth state is not already set
    if (!auth.fio || !auth.email || !auth.role) {
      getUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Save auth state to localStorage whenever it changes
    if (typeof window !== "undefined") {
      localStorage.setItem("auth", JSON.stringify(auth));
    }
  }, [auth]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
