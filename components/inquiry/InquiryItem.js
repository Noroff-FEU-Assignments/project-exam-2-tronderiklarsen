import styles from "../../styles/Messages.module.css";

export default function InquiryItem({inquiry}) {
  return (
    <div className={styles.message}>
      <p>Name: {inquiry.name}</p>
      <p>Email: {inquiry.email}</p>
      <p>Message: {inquiry.message}</p>
    </div>
  );
}
