import Layout from "../components/layout/Layout";
import { useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from "../constants/api";

export default function AdminPage() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      console.log("Error!");
    } else {
      const contact = await response.json();
      router.reload();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title="Contact us - Holidaze">
      <h1>Contact us</h1>
      <h2>Got any question?</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleInputChange}
          placeholder="Enter name"
        ></input>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleInputChange}
          placeholder="Enter email"
        ></input>

        <label htmlFor="message">Message</label>
        <textarea
          type="text"
          id="message"
          name="message"
          value={values.message}
          onChange={handleInputChange}
          placeholder="Enter message"
        ></textarea>

        <input className="btn" type="submit"></input>
      </form>
    </Layout>
  );
}
