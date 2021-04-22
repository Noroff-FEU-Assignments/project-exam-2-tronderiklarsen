export default function LoginForm() {
    return (
        <form>
        <label>Username/email</label>
        <input placeholder="Enter username/email"></input>

        <label>Password</label>
        <input type="password" placeholder="Enter password"></input>

        <input className="btn" type="submit" value="Submit"></input>
    </form>
    )
}

