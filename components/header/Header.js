import Link from "next/link";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import styles from "../../styles/Header.module.css";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.menu}>
      <div>
        <Link href="/">
          <img
            className={styles.logo}
            src="/images/holidaze-logo-white.svg"
          ></img>
        </Link>
      </div>
      <nav>
        <ul>
          {user ? (
            <>
              <li>
                <img src="/images/command.svg"></img>
                <Link href="/admin">
                  <a>Admin</a>
                </Link>
              </li>
              <li>
                <button className="btn-secondary" onClick={() => logout()}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <img src="/images/mail.svg"></img>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <img src="/images/user.svg"></img>
                <Link href="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      </div>
    </header>
  );
}
