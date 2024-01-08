import { useState } from "react";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signup = async (
    name,
    email,
    password,
    phone,
    birthDate,
    role,
    type
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        phone: phone,
        birthDate: birthDate,
        role: role,
        type: type,
      }),
    });

    const json = await response.json();

    if (response.ok) {
      setSuccess(json.message);
      setIsLoading(false);
    }

    if (!response.ok) {
      setIsLoading(false);
      setError(json.msg);
    }
  };

  return { signup, isLoading, error, success };
};
