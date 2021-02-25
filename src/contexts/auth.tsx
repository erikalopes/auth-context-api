import React, {createContext, useState, useEffect} from 'react';
import * as auth from '../services/auth';
import AsyncStorage from '@react-native-community/async-storage';
interface AuthContextData {
  signed: boolean;
  user: object | null;
  signIn(): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<object | null>(null);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem('@RnAuth:user');
      const storageToken = await AsyncStorage.getItem('@RnAuth:token');

      if (storagedUser && storageToken) {
        setUser(JSON.parse(storagedUser));
      }
    }

    loadStorageData();
  }, []);

  async function signIn() {
    const response = await auth.signIn();
    setUser(response.user);

    await AsyncStorage.setItem('@RnAuth:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@RnAuth:token', response.token);
  }

  function signOut() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{signed: !!user, user, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
