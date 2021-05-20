import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../styles/Messages.module.css";
import { API_URL } from "../../constants/api";

export default function InquiryItem({ inquiry }) {

  const deleteInquiry = async (e) => {
    if (confirm("Are you sure you want to delete this inquiry?")) {
      const response = await fetch(`${API_URL}/enquiries/${inquiry.id}`, {
        method: "DELETE",
      });

      const data = response.json();

      if (response.ok) {
        toast.error("Something went wrong");
      } else {
        toast.success("Inquiry deleted")
      }
    }
  };

  return (
    <div className={styles.message}>
      <ToastContainer />
      <div className={styles.controls}>
        <a href="#" onClick={deleteInquiry}>
          <img className={styles.icon} src="/images/x-square.svg"></img>
        </a>
      </div>
      <p>Name: {inquiry.name}</p>
      <p>Email: {inquiry.email}</p>
      <p>Message: {inquiry.message}</p>
    </div>
  );
}
