import { createContext, useEffect, useState, useContext } from "react";
import { Auth, DataStore } from "aws-amplify";
import { User } from "../models";
const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const sub = authUser?.attributes?.sub;

  const getUserInfo = async () => {
    const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
    setAuthUser(user);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserDbInfo = async () => {
    const userResult = await DataStore.query(User, (user) => user.sub.eq(sub));
    setDbUser(userResult[0]);
  };

  useEffect(() => {
    getUserDbInfo();
  }, [sub]);

  return (
    <AuthContext.Provider value={{ authUser, sub, dbUser, setDbUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
