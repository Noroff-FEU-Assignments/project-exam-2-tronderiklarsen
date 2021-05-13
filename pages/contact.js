import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";
import { API_URL } from "../constants/api";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

export default function AdminPage() {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);

    const response = await fetch(`${API_URL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log("Error!");
    } else {
      const contact = await response.json();
      router.reload();
    }
  };

  return (
    <Layout title="Contact us - Holidaze">
      <h1>Contact us</h1>
      <h2>Got any question?</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input
          {...register("name")}
          type="text"
          id="name"
          name="name"
          placeholder="Enter name"
        ></input>
        {errors.name && <span>{errors.name.message}</span>}

        <label htmlFor="email">Email</label>
        <input
          {...register("email")}
          type="email"
          id="email"
          name="email"
          placeholder="Enter email"
        ></input>
        {errors.email && <span>{errors.email.message}</span>}

        <label htmlFor="message">Message</label>
        <textarea
          {...register("message")}
          type="text"
          id="message"
          name="message"
          placeholder="Enter message"
        ></textarea>
        {errors.message && <span>{errors.message.message}</span>}

        <input className="btn" type="submit"></input>
      </form>
    </Layout>
  );
}