import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/layout/Layout";
import { API_URL } from "../constants/api";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "../styles/ErrorMessage.module.css";

const schema = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  message: yup
    .string()
    .required("Please enter your message")
    .min(10, "The message must be at least 10 characters"),
});

export default function ContactPage() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const response = await fetch(`${API_URL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      toast.error("Something went wrong"), {
        className: "error-toast"
      };
    } else {
      
      toast.success("Message sent!", {
        className: "success-toast",
      });
    }
  };

  return (
    <Layout title="Contact us - Holidaze">
      <ToastContainer />
      <h1>Contact us</h1>
      <h2>Got any question?</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input
          {...register("name")}
          type="text"
          placeholder="Enter name"
        ></input>
        {errors.name && (
          <span className={styles.error}>{errors.name.message}</span>
        )}

        <label htmlFor="email">Email</label>
        <input
          {...register("email")}
          type="text"
          placeholder="Enter email"
        ></input>
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}

        <label htmlFor="message">Message</label>
        <textarea
          {...register("message")}
          type="text"
          placeholder="Enter message"
        ></textarea>
        {errors.message && (
          <span className={styles.error}>{errors.message.message}</span>
        )}

        <input className="btn" type="submit"></input>
      </form>
    </Layout>
  );
}