export default function ContactForm() {
    return (
        <form>
            <label>Name</label>
            <input placeholder="Enter name"></input>

            <label>E-mail</label>
            <input placeholder="Enter e-mail"></input>

            <label>Message</label>
            <textarea placeholder="Enter message"></textarea>

            <input className="btn" type="submit" value="Submit"></input>
        </form>
    )
}