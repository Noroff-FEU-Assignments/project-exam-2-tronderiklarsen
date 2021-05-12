import Layout from "../components/layout/Layout";
import styles from "../styles/Place.module.css";
import { API_URL } from "../constants/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function PlacePage({ place }) {
  const router = useRouter();

  const deletePlace = async (e) => {
    if (confirm("Are you sure you want to delete this place?")) {
      const response = await fetch(`${API_URL}/places/${place.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if(!response.ok) {
          console.log("error!")
      } else {
          router.push("/results")
      }
    }
  };

  return (
    <Layout>
      <div className={styles.place}>
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
        {place.image && (
          <Image src={place.image.formats.thumbnail.url} height={333} width={500}/>
        )}
        <h1>{place.name}</h1>
        <p>{place.description}</p>
        <p>Address: {place.address}</p>
        <h2>{place.price} NOK</h2>
        <a className="btn">Enquire</a>
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
