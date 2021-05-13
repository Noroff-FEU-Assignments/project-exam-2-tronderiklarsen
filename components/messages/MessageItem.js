import styles from "../../styles/Messages.module.css";

export default function MessageItem({ message }) {
  return (
    <div className={styles.message}>
      <p>Name: {message.name}</p>
      <p>Email: {message.email}</p>
      <p>Message: {message.message}</p>
    </div>
  );
}