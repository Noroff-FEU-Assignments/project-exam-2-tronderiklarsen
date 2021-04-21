import Head from "next/head"

export default function Layout({title, children}) {
    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>

            {children}
        </div>
    )
}

Layout.defaultProps = {
    title: "Holidaze - Find your next accommodation"
}