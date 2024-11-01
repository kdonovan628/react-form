import { useState } from "react";

const Authenticate = ({ token }) => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setError(null); // Reset error state
    setSuccessMessage(null); // Reset success message

    if (!token) {
      setError("No token available. Please sign up first.");
      return;
    }

    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }   
      });

      const result = await response.json();
      
      if (response.ok) {
        setSuccessMessage(result.message);
      } else {
        setError(result.message || "Failed to authenticate.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <>
      <h2>Authenticate</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </>
  );
};

export default Authenticate;