import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSignup } from "../../hooks/useSignup";
import { NavbarComponent } from "../../components/navbar/Navbar";

export const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    birthDate: "",
    role: "",
    type: "Member",
  });

  const { signup, error, success } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = user.name.trim();

    if (trimmedName === "") {
      const notify = () => toast.error("Name cannot be empty");
      notify();
      return;
    }

    try {
      await signup(
        trimmedName,
        user.email,
        user.password,
        user.phone,
        user.birthDate,
        user.role,
        user.type
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (error) {
      const notify = () => toast.error(error);
      notify();
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      setUser({
        name: "",
        email: "",
        password: "",
        phone: "",
        birthDate: "",
        role: "",
        type: "Member",
      });
      const form = document.querySelector("form");
      form.reset();
      const notify = () => toast.success(success);
      notify();
    }
  }, [success]);

  return (
    <>
      <NavbarComponent />
      <div className="container login-form border rounded-4">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h1>Sign up</h1>
            <div className="input-container">
              <input
                type="text"
                placeholder="Name"
                required
                value={user.name}
                className="form-control"
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
            <div className="input-container">
              <input
                type="email"
                required
                className="form-control"
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="input-container">
              <input
                required
                type="password"
                className="form-control"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <div className="input-container">
              <input
                type="tel"
                required
                className="form-control"
                placeholder="Phone"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
              />
            </div>
            <div className="input-container">
              <label>Date of Birth: </label>
              <input
                type="date"
                required
                className="form-control"
                value={user.birthDate}
                onChange={(e) =>
                  setUser({ ...user, birthDate: e.target.value })
                }
              />
            </div>
            <div className="input-container">
              <label>Role: </label>
              <select
                className="form-control"
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              >
                <option value="">Select Role</option>
                <option value="Seller">Seller</option>
                <option value="Buyer">Buyer</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success m-2">
              Sign up
            </button>
          </form>
          <ToastContainer />
          <Link to="/login" className="btn btn-secondary btn-sm">
            Login
          </Link>
        </div>
      </div>
    </>
  );
};
