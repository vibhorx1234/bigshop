import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const resetVerification = () => {
    setEmailVerified(false);
    setPhoneVerified(false);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        setUser,
        emailVerified,
        setEmailVerified,
        phoneVerified,
        setPhoneVerified,
        resetVerification
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};