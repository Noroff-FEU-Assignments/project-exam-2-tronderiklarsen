import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../../components/layout/Layout";
import { useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from "../../constants/api";
import ImageUpload from "../../components/image/imageUpload";
import Image from "next/image";

export default function EditPage({ place }) {
  const [values, setValues] = useState({
    name: place.name,
    address: place.address,
    description: place.description,
    price: place.price,
  });

  const [imagePreview, setPreview] = useState(
    place.image ? place.image.formats.thumbnail.url : null
  );

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/places/${place.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      toast.error("Something went wrong")
    } else {
      const place = await response.json();
      router.push(`/${place.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async (e) => {
    const response = await fetch(`${API_URL}/places/${place.id}`);
    const data = await response.json();
    setPreview(data.image.formats.thumbnail.url);
  };

  return (
    <Layout title="Admin - Holidaze">
      <ToastContainer />
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

      <h1>Image</h1>

      <h2>Image preview:</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={150} />
      ) : (
        <div>
          <p>No image available</p>
        </div>
      )}

      <ImageUpload placeId={place.id} imageUploaded={imageUploaded} />
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