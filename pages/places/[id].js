import Layout from "../../components/layout/Layout";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { API_URL } from "../../constants/api";

export default function EditPage({place}) {
  const [values, setValues] = useState({
    name: place.name,
    address: place.address,
    description: place.description,
    price: place.price,
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/places/${place.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      console.log("error!");
    } else {
      const place = await response.json();
      router.push(`/${place.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title="Admin - Holidaze">
      <h1>Edit place</h1>
      
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

        <input className="btn" type="submit" value="Update"></input>
      </form>
    </Layout>
  );
}

export async function getServerSideProps({params: {id}
}) {
  const response = await fetch(`${API_URL}/places/${id}`)
  const place = await response.json()

  return {
    props: {
      place
    }
  }

}