import Head from "next/head"
import Header from "../header/Header"
import styles from "../../styles/Layout.module.css"

export default function Layout({title, children}) {
    return (
        <div>
            <Head>
                <title>{title}</title>
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