import { useState, createContext } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ user, tokens, children }) {
  const [authTokens, setAuthTokens] = useState(tokens);
  const [userAccount, setUserAccount] = useState(user);


  return (
    <AuthContext.Provider value={{ authTokens, userAccount, setAuthTokens, setUserAccount}}>
      {children}
    </AuthContext.Provider>
  );
}
