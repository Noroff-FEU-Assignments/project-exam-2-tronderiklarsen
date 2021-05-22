import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/layout/Layout";
import styles from "../styles/AdminPage.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from "../constants/api";
import MessageItem from "../components/messages/MessageItem";
import InquiryItem from "../components/inquiry/InquiryItem";

export default function AdminPage({ messages, enquiries }) {
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      toast.error("Something went wrong");
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
      <ToastContainer />
      <div className={styles.admin}>
        <div>
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
        </div>

        <div className={styles.messages}>
          <h1>Enquires</h1>
          <h2>from inqury page</h2>
          {enquiries.length === 0 && <p>No enquiries...</p>}
          {enquiries.map((inquiry) => (
            <InquiryItem key={inquiry.id} inquiry={inquiry} />
          ))}

          <h1>Messages</h1>
          <h2>from contact form</h2>
          {messages.length === 0 && <p>No messages...</p>}
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const response = await fetch(`${API_URL}/contacts?_sort=id:desc`);
  const messages = await response.json();

  const res = await fetch(`${API_URL}/enquiries?_sort=id:desc`);
  const enquiries = await res.json();

  return {
    props: {
      messages,
      enquiries,
    },
  };
}
