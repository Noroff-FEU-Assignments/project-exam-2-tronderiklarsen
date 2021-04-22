import Link from "next/link"
import styles from "../../styles/Header.module.css"

export default function Header() {
    return (
        <header className={styles.header}>
            <div>
                <Link href="/">
                    <img className={styles.logo} src="images/holidaze-logo-white.svg"></img>
                </Link>
            </div>
            <nav className={styles.menu}>
                <ul>
                    <li><i class="far fa-envelope"></i><Link href="/contact">Contact</Link></li>
                    <li><i class="far fa-user"></i><Link href="/login">Login</Link></li>
                </ul>
            </nav>
        </header>
    )
}
