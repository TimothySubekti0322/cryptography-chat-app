import { createContext, useState } from "react";

export const CredentialContext = createContext({
  username: "",
  setUsername: (username) => {},
  password: "",
  setPassword: (password) => {},
});

function CredentialContextProvider({ children }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameHandler = (username) => {
    console.log("Username context: ", username);
    setUsername(username);
  };

  const passwordHandler = (password) => {
    console.log("Password context: ", password);
    setPassword(password);
  };

  const value = {
    username: username,
    setUsername: usernameHandler,
    password: password,
    setPassword: passwordHandler,
  };

  return (
    <CredentialContext.Provider value={value}>
      {children}
    </CredentialContext.Provider>
  );
}

export default CredentialContextProvider;
