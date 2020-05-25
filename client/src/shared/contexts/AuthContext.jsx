import React, { createContext, useState, useCallback, useEffect } from 'react';

//Authentication context 
export const AuthContext = createContext({
    isLoggedIn: false,
    userId: null,
    token: null,
    name: null,
});

let logoutTimer;

const AuthContextProvider = (props) => {

    const [token, setToken] = useState(false);
    const [userId, setUserId] = useState(false);
    const [name, setName] = useState(false)
    const [expirTime, setExpTimer] = useState();

    const login = useCallback((uid, token, name, expirInTime ) => {
        setToken(token);
        setUserId(uid);
        setName(name)
        const tokenExpirationTime =
        expirInTime || new Date(new Date().getTime() + 1000 * 60 * 60);
          setExpTimer(tokenExpirationTime);
    
        localStorage.setItem
        ('userData', 
        JSON.stringify(
          {userId: uid,
           token: token,
           name: name, 
           expiration: tokenExpirationTime.toISOString() }));
      }, []);

      const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setName(null);
        setExpTimer(null);
        localStorage.removeItem('userData');
      }, []);

      useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData && storedData.token && new Date(storedData.expiration) > new Date() ) {
          login(storedData.userId, storedData.token, storedData.name, new Date(storedData.expiration));
        }
      }, [login]);
    
      useEffect(() => {
        if(token && expirTime){
          const remainingTime = expirTime.getTime() - new Date().getTime();
          logoutTimer = setTimeout(logout, remainingTime);
        }else {
          clearTimeout(logoutTimer);
        }
      }, [token, logout, expirTime]);

    return(
        <AuthContext.Provider value={{
            isLoggedIn: !!token,
            token: token,
            userId: userId,
            name: name,
            login,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;