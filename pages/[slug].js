import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Layout from "../components/layout/Layout";
import PlaceMap from "../components/map/PlaceMap";
import styles from "../styles/Place.module.css";
import { API_URL } from "../constants/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function PlacePage({ place }) {
  const router = useRouter();

  const { user } = useContext(AuthContext);

  const deletePlace = async (e) => {
    if (confirm("Are you sure you want to delete this place?")) {
      const response = await fetch(`${API_URL}/places/${place.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error("Something went wrong")
      } else {
        router.push("/results");
      }
    }
  };

  return (
    <Layout>
      <ToastContainer />
      <Link href="/">Return</Link>
      <div className={styles.place}>
        {user ? (
          <>
            <div className={styles.controls}>
              <Link href={`/places/${place.id}`}>
                <a>
                  <img className={styles.icon} src="/images/edit.svg"></img>Edit
                  place
                </a>
              </Link>

              <a href="#" onClick={deletePlace} className={styles.delete}>
                <img className={styles.icon} src="/images/x-square.svg"></img>
                Delete place
              </a>
            </div>
          </>
        ) : (
          <></>
        )}
        {place.image && (
          <Image
            src={place.image.formats.medium.url}
            height={333}
            width={500}
            layout="responsive"
          />
        )}
        <h1>{place.name}</h1>
        <p>{place.description}</p>
        <h3>Price:</h3>
        <p>{place.price} NOK</p>
        <h3>Address:</h3>
        <p>{place.address}</p>
        <PlaceMap place={place}/>
        <Link href={`/inquiry/${place.id}`}>
          <a className="btn">Inquire</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { slug } }) {
  const response = await fetch(`${API_URL}/places?slug=${slug}`);
  const places = await response.json();

  return {
    props: {
      place: places[0],
    },
  };
}