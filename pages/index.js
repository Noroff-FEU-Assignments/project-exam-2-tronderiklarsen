import Layout from "../components/layout/Layout";
import Search from "../components/search/Search";
import { API_URL } from "../constants/api";
import PlaceItem from "../components/places/PlaceItem";
import styles from "../styles/FlexContainer.module.css";
import Link from "next/link"

export default function HomePage({ places }) {
  return (
    <Layout>
      <h1>Find your next place to stay!</h1>
      <h2>Hotels, B&Bs and guesthouses</h2>

      <Search />

      <h1>Explore Bergen</h1>
      <h2>Newest places</h2>

      {places.length === 0 && <p>No places to show</p>}

      <div className={styles.flex}>
        {places.map((place) => (
          <div className={styles.place} key={place.id} >
          <PlaceItem place={place} />
          </div>
        ))}
      </div>
      <Link href="/all">View all</Link>
    </Layout>
  );
}

export async function getServerSideProps() {
  const response = await fetch(`${API_URL}/places?_sort=id:desc&_limit=3`);
  const places = await response.json();

  return {
    props: {
      places,
    },
  };
}
