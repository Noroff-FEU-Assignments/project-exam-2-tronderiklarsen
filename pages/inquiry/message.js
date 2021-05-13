import Layout from "../../components/layout/Layout"

export default function InquiryMessage() {
    return (
        <Layout title="Inquiry - Holidaze">
            <div className={styles.inquiry}>
                <h1>Inquiry submitted!</h1>
                <h2>We will contact you soon.</h2>
            </div>
        </Layout>
    )
}
