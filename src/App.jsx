import SignUpForm from "./components/SignUpForm";
import Authenticate from "./components/Authenticate";
import { useState } from "react";

const App = () => {
  const [token, setToken] = useState('');

  console.log("Current token:", token);

  return (
    <>
      <SignUpForm setToken={setToken} />
      {token ? (
        <>
          <p>Token: {token}</p> {/* Temporary display of token for debugging */}
          <Authenticate token={token} />
        </>
      ) : (
        <p style={{ color: 'red' }}>Please sign up to obtain a token.</p>
      )}
    </>
  );
};

export default App;