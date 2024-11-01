import { useState } from "react";

const SignUpForm = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // reset error state before submission

    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      const result = await response.json();
      console.log("Sign-Up Response:", result); // Debugging: Log the result

      if (response.ok && result.token) {
        setToken(result.token);
      } else {
        setError(result.message || "Sign-up failed: No access token provided.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred during sign-up.");
    }
  };

  return (
    <>
      <h2>Sign Up</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if it exists */}

      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SignUpForm;