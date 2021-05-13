import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../../components/layout/Layout";
import { useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from "../../constants/api";

export default function EnquiryPage({ place }) {
  const [values, setValues] = useState({
    regarding: place.name,
    name: "",
    email: "",
    message: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/enquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      toast.error("Something went wrong")
    } else {
      const place = await response.json();
      router.reload();
      toast.success("Inquiry sent")
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title="Admin - Holidaze">
      <ToastContainer />
      <h1>Inquiry</h1>
      <h2>{place.name}</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="regarding">Regarding</label>
        <input
          type="text"
          id="regarding"
          name="regarding"
          value={values.regarding}
          onChange={handleInputChange}
        ></input>

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
          type="text"
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

        <input className="btn" type="submit" value="Submit"></input>
      </form>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const response = await fetch(`${API_URL}/places/${id}`);
  const place = await response.json();

  return {
    props: {
      place,
    },
  };
}