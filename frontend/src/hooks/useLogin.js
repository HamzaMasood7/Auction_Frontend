import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const json = await response.json();
      console.log(json)

      if (!response.ok) {
        setIsLoading(false);

        setError(json.message || "An error occurred");
      } else {
       document.cookie = `USER_ACCESS_TOKEN=${json.token}; path=/; samesite=strict`;

       // Save user data to local storage
       localStorage.setItem("user", JSON.stringify(json.data));

       // Update the auth context
       dispatch({ type: "LOGIN", payload: json.data });

       // Update loading state
       setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { login, isLoading, error };
};
