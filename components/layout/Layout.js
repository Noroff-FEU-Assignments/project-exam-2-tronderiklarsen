import Head from "next/head"
import Header from "../header/Header"
import Footer from "../footer/Footer"
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

            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: "Holidaze - Find your next place to stay"
}