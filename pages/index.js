import Layout from "../components/layout/Layout"
import Search from "../components/search/Search"
import { API_URL } from "../constants/api"
import PlaceItem from "../components/places/PlaceItem"

export default function HomePage( {places} ) {
  return (
    <Layout>
      <h1>Find your next place to stay!</h1>
      <h2>Hotels, B&Bs and guesthouses</h2>

      <Search />

      <h1>Explore Bergen</h1>
      <h2>Featured places</h2>

      {places.map((place) => (
         <PlaceItem key={place.id} place={place}/>
      ))}
    </Layout>
  )
}

export async function getServerSideProps() {
  const response = await fetch(`${API_URL}/places`)
  const places = await response.json();

  return {
    props: { places },
  }
}