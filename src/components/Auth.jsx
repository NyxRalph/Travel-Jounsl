import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

function Auth({ onAuthChange }) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (onAuthChange) onAuthChange(user);
    });
    return () => unsubscribe();
  }, [onAuthChange]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleGoogleSignIn = async () => {
    setError("");
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err.message);
    }
  };

  if (user) {
    return (
      <div className="auth__card">
        <p>Welcome, {user.email}!</p>
        <button className="auth__button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="auth__container">
      <div className="auth__card">
        <div className="auth__header">
          <img src="/public/logo192.png" alt="Logo" className="auth__logo" />
          <h2 className="auth__title">Travel Journal</h2>
        </div>
        <h3 className="auth__subtitle">{isLogin ? "Login" : "Sign Up"}</h3>
        <button className="auth__google" onClick={handleGoogleSignIn}>
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google logo"
            className="auth__google-logo"
          />
          Sign in with Google
        </button>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input
            className="auth__input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="auth__input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="auth__button" type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <div className="auth__divider">
          <span>or</span>
        </div>
        <button className="auth__toggle" onClick={() => setIsLogin((v) => !v)}>
          {isLogin
            ? "Need an account? Sign Up"
            : "Already have an account? Login"}
        </button>
        {error && <p className="auth__error">{error}</p>}
        <div className="auth__footer">
          &copy; {new Date().getFullYear()} Travel Journal
        </div>
      </div>
    </div>
  );
}

export default Auth;
