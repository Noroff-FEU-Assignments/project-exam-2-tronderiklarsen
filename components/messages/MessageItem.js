import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../constants/api";
import { useRouter } from "next/router";
import styles from "../../styles/Messages.module.css";

export default function MessageItem({ message }) {
  const router = useRouter();

  const deleteMessage = async (e) => {
    if (confirm("Are you sure you want to delete this message")) {
      const response = await fetch(`${API_URL}/contacts/${message.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        toast.error("Something went wrong");
      } else {
        toast.success("Message deleted")
      }
    }
  };

  return (
    <div className={styles.message}>
      <ToastContainer />
      <div className={styles.controls}>
        <a href="#" onClick={deleteMessage}>
          <img className={styles.icon} src="/images/x-square.svg"></img>
        </a>
      </div>
      <p>Name: {message.name}</p>
      <p>Email: {message.email}</p>
      <p>Message: {message.message}</p>
    </div>
  );
}
