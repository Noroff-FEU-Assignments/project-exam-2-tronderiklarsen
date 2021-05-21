import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../constants/api";
import { useRouter } from "next/router";
import styles from "../../styles/Messages.module.css";

export default function MessageItem({ message }) {
  const router = useRouter();

  const deleteMessage = async () => {
    if (confirm("Are you sure you want to delete this message")) {
      const response = await fetch(`${API_URL}/contacts/${message.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        toast.error("Something went wrong"),
          {
            className: "error-toast",
          };
      } else {
        router.reload("/admin");
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
