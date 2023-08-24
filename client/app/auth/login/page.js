"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from './page.module.css'
import { useState } from "react";
import { signIn } from "next-auth/react";

const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleSubmit = async () =>{
      const pathname = window.location.pathname
      await signIn('credentials',{
            username: email,
            password: password,
            redirect: true,
            callbackUrl: pathname === '/admin' ? '/admin' : '/'
        })
    }

  return (
    <div className={styles.login}>
      <form>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input type="email" id="email" className="form-control" onChange={(e) => setEmail(e.target.value)}/>
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input type="password" id="password" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <button type="button" className={`btn btn-primary btn-block mb-4 ${styles.loginButton}`} onClick={handleSubmit}>
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
