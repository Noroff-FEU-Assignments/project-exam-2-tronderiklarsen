import Head from "next/head"
import Header from "../header/Header"
import styles from "../../styles/Layout.module.css"

export default function Layout({title, children}) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <script src="https://kit.fontawesome.com/bbd2f56e96.js" crossorigin="anonymous"></script>
            </Head>

            <Header />

            <div className={styles.container}>
                {children}
            </div>
        </div>
    )
}

Layout.defaultProps = {
    title: "Holidaze - Find your next accommodation"
}