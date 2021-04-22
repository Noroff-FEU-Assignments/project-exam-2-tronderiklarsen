import Layout from "../components/layout/Layout"
import LoginForm from "../components/login/LoginForm"

export default function LoginPage() {
    return (
        <Layout title="Login - Holidaze">
            <h1>Login</h1>
            <LoginForm />   
        </Layout>
    )
}