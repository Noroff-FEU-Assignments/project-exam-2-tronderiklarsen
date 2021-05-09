import Layout from "../components/layout/Layout";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { API_URL } from "../constants/api";

export default function AdminPage() {
  const [values, setValues] = useState({
    name: "",
    address: "",
    description: "",
    price: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/places`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      console.log("error!");
    } else {
      const place = await response.json();
      router.push(`/places/${place.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title="Admin - Holidaze">
      <h1>Welcome, Admin!</h1>
      <h2>Add places, see enquires and messages</h2>

      <h1>Add</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleInputChange}
          placeholder="Enter name of place"
        ></input>

        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={values.address}
          onChange={handleInputChange}
          placeholder="Enter address"
        ></input>

        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={values.price}
          onChange={handleInputChange}
          placeholder="Enter price"
        ></input>

        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          id="description"
          name="description"
          value={values.description}
          onChange={handleInputChange}
          placeholder="Enter description"
        ></textarea>

        <input className="btn" type="submit"></input>
      </form>

      <h1>Enquires</h1>

      <h1>Messages</h1>
      <h2>from contact form</h2>
    </Layout>
  );
}