import React, { createContext, useContext, useState } from 'react';

export const LoginContext = createContext(null);

export const ContextProvider = ({ children }) => {
    const [account, setAccount] = useState([]);

    return (
        <LoginContext.Provider value={{ account, setAccount }}>{children}</LoginContext.Provider>
    )
}

export const UseUiProvider = () => {
    return useContext(LoginContext);
}
