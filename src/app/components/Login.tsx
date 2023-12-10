// Login.js
import React from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
} from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);

interface LoginProps {
  onLogin: () => void;
  onLogout: () => void;
  user: User | null;
}

const Login: React.FC<LoginProps> = ({ onLogin, onLogout, user }) => {
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    onLogin(); // ログイン後の処理
  };

  const logout = async () => {
    await signOut(auth);
    onLogout(); // ログアウト後の処理
  };

  return (
    <div>
      {user ? (
        <>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={loginWithGoogle}>Login With Google</button>
      )}
    </div>
  );
};

export default Login;
