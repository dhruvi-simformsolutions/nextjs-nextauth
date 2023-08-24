"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from './page.module.css'
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
      <button type="button" className={`btn btn-primary btn-block mb-4 ${styles.actionButton}`} onClick={() => session?.user?.email ? signOut() : signIn()}>
          {session?.user?.email ? 'Log Out' : 'Log In'}
        </button>
      </div>

      {session?.user?.email? 
          <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Access Token</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{session.user.id}</th>
              <td>{session.user.username}</td>
              <td>{session.user.email}</td>
              <td>{session.user.role}</td>
              <td className={styles.accessToken}>{session.user.accessToken}</td>
            </tr>
          </tbody>
        </table>
        : null}
        
    </main>
  )
}
