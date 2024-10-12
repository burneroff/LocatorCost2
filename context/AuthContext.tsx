import { createContext, Dispatch, SetStateAction, useState, ReactNode } from "react";

// Define the type for the auth state
interface AuthState {
  fio: string | null;
  email: string | null;
  role: string | null;
}

// Define the type for the context value
interface AuthContextType {
  auth: AuthState;
  setAuth: Dispatch<SetStateAction<AuthState>>;
}

// Provide a default value for the context
const defaultAuthContext: AuthContextType = {
  auth: { fio: null, email: null, role: null },
  setAuth: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<AuthState>({
    fio: null,
    email: null,
    role: null,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
