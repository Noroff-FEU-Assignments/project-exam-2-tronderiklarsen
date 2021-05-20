import Layout from "../components/layout/Layout";
import PlaceItem from "../components/places/PlaceItem";
import { API_URL } from "../constants/api";
import styles from "../styles/FlexContainer.module.css";
import Link from "next/link"

export default function AllPlaces({ places }) {
  return (
    <Layout>
      <h1>All places</h1>
      <h2>Pick and choose</h2>

      {places.length === 0 && <p>No places to show</p>}
      <div className={styles.flex}>
        {places.map((place) => (
          <div className={styles.place} key={place.id}>
            <PlaceItem place={place} />
          </div>
        ))}
      </div>
      <Link href="/">Return</Link>
    </Layout>
  );
}

export async function getServerSideProps() {
    const response = await fetch(`${API_URL}/places?_sort=id`);
    const places = await response.json();
  
    return {
      props: {
        places,
      },
    };
  }
