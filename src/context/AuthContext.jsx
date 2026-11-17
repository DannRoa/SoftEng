import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => read('capo_session', null));

  const signup = useCallback(({ name, mobile, password }) => {
    const users = read('capo_users', []);
    if (users.some((u) => u.mobile === mobile)) throw new Error('This mobile number is already registered.');
    const newUser = { name, mobile, password };
    localStorage.setItem('capo_users', JSON.stringify([...users, newUser]));
    const session = { name, mobile };
    localStorage.setItem('capo_session', JSON.stringify(session));
    setUser(session);
    return session;
  }, []);

  const login = useCallback(({ mobile, password }) => {
    const found = read('capo_users', []).find((u) => u.mobile === mobile && u.password === password);
    if (!found) throw new Error('Wrong mobile number or password.');
    const session = { name: found.name, mobile: found.mobile };
    localStorage.setItem('capo_session', JSON.stringify(session));
    setUser(session);
    return session;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('capo_session');
    setUser(null);
  }, []);

  return <AuthContext.Provider value={{ user, signup, login, logout }}>{children}</AuthContext.Provider>;
}