import React from 'react';

const LoginContext = React.createContext();
export default LoginContext;
export const LoginConsumer = LoginContext.Consumer;
export const LoginProvider = LoginContext.Provider;
