"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import "./login.css";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username, password);
  };

  return (
    <div className="container">
      <div className="loginBox">
        <h1><center>LOGIN</center></h1>

        <form onSubmit={handleSubmit} className="form">
          <div className="formRow">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
          </div>

          <div className="formRow">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
