import Link from "next/link";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import styles from "../../styles/Header.module.css";
import Image from "next/image";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.menu}>
      <div>
        <Link href="/">
          <Image
            className={styles.logo}
            src="/images/holidaze-logo-white.svg"
            height={55}
            width={135}
          ></Image>
        </Link>
      </div>
      <nav>
        <ul>
          {user ? (
            <>
              <li>
                <Image src="/images/settings.svg" height={24} width={24}></Image>
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
                <Image src="/images/mail.svg" height={24} width={24}></Image>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Image src="/images/user.svg" height={24} width={24}></Image>
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
